import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  calculateExpectedDamage,
  convolve,
  consolidateDists,
} from "./Calculation";
import { selectactivityPathEntities } from "./Routine/activityPathSlice";
import { selectdamageEntities } from "./Routine/damageSlice";
import { selectRoutineEntities } from "./Routine/routineSlice";
import { selecttargetEntities } from "./Target/targetSlice";
import { selectweaknessEntities } from "./Target/weaknessSlice";
import { conditions } from "./types";
import { Bar, Line, Scatter } from "react-chartjs-2";

const Display = () => {
  const [addPersistent, setAddPersistent] = useState(false);
  const [perMulti, setPerMulti] = useState(2);

  const routines = useSelector(selectRoutineEntities);
  const activityPaths = useSelector(selectactivityPathEntities);
  const targets = useSelector(selecttargetEntities);
  const damages = useSelector(selectdamageEntities);
  const weaknesses = useSelector(selectweaknessEntities);

  // const selectedRoutine = routines[useSelector(selectSelectedRoutine)];

  function evaluateActivityPath(activityPath) {
    let currentTarget = targets[0];
    let currentDamages = activityPath.damages.map(
      (damageId) => damages[damageId]
    );
    let currentWeaknesses = currentTarget.weaknesses.map(
      (weaknessId) => weaknesses[weaknessId]
    );

    // damage tress = [critDamages, succDamages, failDamages, crfaDamages]
    // critDamages = {normal, persistent}
    // normal = {fire..., staticDamage, damageDist}
    let [damageTrees, chances] = calculateExpectedDamage(
      activityPath,
      currentDamages,
      currentTarget,
      currentWeaknesses
    );
    // console.log(`chances are ${chances}`);

    // go through each activity path, depending on its condition add its damage distributions to this activities appropriately
    activityPath.apIds.forEach((apId) => {
      let ap = activityPaths[apId];
      let [pathDist, pathPDist] = evaluateActivityPath(ap);

      let indicies = [];
      // console.log(`cond is: ${ap.condition}`);
      switch (ap.condition) {
        case conditions.ALWAYS:
          indicies = [0, 1, 2, 3];
          break;

        case conditions.AT_LEAST_FAIL:
          indicies = [0, 1, 2];
          break;

        case conditions.AT_LEAST_SUCC:
          indicies = [0, 1];
          break;

        case conditions.CRIF:
          indicies = [3];
          break;

        case conditions.CRIT:
          indicies = [0];
          break;

        case conditions.FAIL:
          indicies = [2];
          break;

        case conditions.FAIL_WORSE:
          indicies = [2, 3];
          break;

        case conditions.SUCC:
          indicies = [1];
          break;

        case conditions.SUCC_WORSE:
          indicies = [1, 2, 3];
          break;

        default:
      }
      // console.log(`indies are: ${indicies}`);
      for (let index of indicies) {
        // console.log(
        //   `adding damage to index ${index} w/ chance ${chances[index]}`
        // );
        // damageTrees[index].normal.staticDamage += pathSD;
        damageTrees[index].normal.damageDist = convolve(
          damageTrees[index].normal.damageDist,
          pathDist
        );
        // damageTrees[index].persistent.staticDamage += pathPSD;
        damageTrees[index].persistent.damageDist = convolve(
          damageTrees[index].persistent.damageDist,
          pathPDist
        );
      }
      // console.log(pathChance);
    });

    let damageDist = consolidateDists(
      [damageTrees[0].normal, chances[0]],
      [damageTrees[1].normal, chances[1]],
      [damageTrees[2].normal, chances[2]],
      [damageTrees[3].normal, chances[3]]
    );
    let PdamageDist = consolidateDists(
      [damageTrees[0].persistent, chances[0]],
      [damageTrees[1].persistent, chances[1]],
      [damageTrees[2].persistent, chances[2]],
      [damageTrees[3].persistent, chances[3]]
    );

    return [damageDist, PdamageDist];
  }

  let maxDamage = 0;
  let maxPDamage = 0;
  const datasets = [];
  const expectedDamages = [];
  const expectedPersistentDamages = [];
  // TODO: use distribution
  for (let id in routines) {
    let routine = routines[id];
    let expD = 0;
    let expP = 0;
    let routineDDist = [1];
    let routinePDDist = [1];
    for (let i = 0; i < routine.apIds.length; i++) {
      let activityPath = activityPaths[routine.apIds[i]];
      let [damageDist, PdamageDist] = evaluateActivityPath(activityPath);
      routineDDist = convolve(routineDDist, damageDist);
      routinePDDist = convolve(routinePDDist, PdamageDist);
    }
    maxDamage = Math.max(maxDamage, routineDDist.length - 1);
    maxPDamage = Math.max(maxPDamage, routinePDDist.length - 1);
    const dataArray = [];
    for (let i = 0; i < routineDDist.length; i++) {
      dataArray.push({ x: i, y: routineDDist[i] });
      expD += routineDDist[i] * i;
    }
    datasets.push({
      fill: "origin",
      label: routine.name,
      data: dataArray,
      xAxisID: "damage",
      yAxisID: "chance",
      spanGaps: false,
    });
    // }
    // maxDamage += damageDist.length-1;

    // routine.apIds.forEach((apId) => {
    //   let activityPath = activityPaths[apId];
    //   let [damageDist, PdamageDist] = evaluateActivityPath(activityPath);
    //   maxDamage = Math.max(maxDamage, damageDist.length);

    //   const dataArray = [];
    //   const labels = [];
    //   for (let i = 0; i < damageDist.length; i++) {

    //     labels.push(i);
    //     dataArray.push({ x: i, y: damageDist[i] });
    //   }
    //   const data = {
    //     labels,
    //     datasets: [
    //       {
    //         fill: "origin",
    //         label: "Chance",
    //         data: dataArray,
    //         xAxisID: "damage",
    //         yAxisID: "chance",
    //         spanGaps: false,
    //       },
    //     ],
    //   };

    //   // expectedDamages.push(
    //   //   <Bar key={routine.id} data={data} />
    //   //   // <p key={routine.id}>
    //   //   //   {routine.name}
    //   //   //   {": "}
    //   //   //   {addPersistent ? expD + expP * perMulti : expD}
    //   //   // </p>
    //   // );
    // });

    expectedDamages.push(
      <div key={routine.id}>
        {routine.name}
        {": "}
        {expD}
      </div>
    );
    // expectedDamages.push(
    //   <Bar key={routine.id} data={data} />
    //   // <p key={routine.id}>
    //   //   {routine.name}
    //   //   {": "}
    //   //   {addPersistent ? expD + expP * perMulti : expD}
    //   // </p>
    // );
    expectedPersistentDamages.push(
      <div key={routine.id}>
        {routine.name}
        {": "}
        {expP}
      </div>
    );
  }
  const labels = [];
  for (let i = 0; i <= maxDamage; i++) {
    labels.push(i);
  }
  const data = {
    labels,
    datasets,
  };

  return (
    <div className="box">
      Add persistent damage:
      <input
        type="checkbox"
        checked={addPersistent}
        onChange={(e) => setAddPersistent(e.target.checked)}
      />
      , persistent damage multiplier:
      <input
        type="number"
        value={perMulti ? perMulti : 0}
        onChange={(e) => setPerMulti(e.target.valueAsNumber)}
      />
      <div>
        Expected Damage:
        {expectedDamages}
      </div>
      <Bar data={data} />
      {addPersistent ? (
        ""
      ) : (
        <div>
          Expected Persistent Damage:
          {expectedPersistentDamages}
        </div>
      )}
    </div>
  );
};

export default Display;
