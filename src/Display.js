import React, { useState } from "react";
import { useSelector } from "react-redux";
import { calculateExpectedDamage } from "./Calculation";
import { selectactivityPathEntities } from "./Routine/activityPathSlice";
import { selectdamageEntities } from "./Routine/damageSlice";
import {
  selectRoutineEntities,
  selectSelectedRoutine,
} from "./Routine/routineSlice";
import { selecttargetEntities } from "./Target/targetSlice";
import { selectweaknessEntities } from "./Target/weaknessSlice";
import { conditions } from "./types";

const Display = () => {
  const [addPersistent, setAddPersistent] = useState(false);
  const [perMulti, setPerMulti] = useState(2);

  const routines = useSelector(selectRoutineEntities);
  const activityPaths = useSelector(selectactivityPathEntities);
  const targets = useSelector(selecttargetEntities);
  const damages = useSelector(selectdamageEntities);
  const weaknesses = useSelector(selectweaknessEntities);

  const selectedRoutine = routines[useSelector(selectSelectedRoutine)];

  function evaluateActivityPath(chance, activityPath) {
    let currentTarget = targets[0];
    let currentDamages = activityPath.damages.map(
      (damageId) => damages[damageId]
    );
    let currentWeaknesses = currentTarget.weaknesses.map(
      (weaknessId) => weaknesses[weaknessId]
    );

    let [expD, expP, critSucc, succ, fail, critFail] = calculateExpectedDamage(
      activityPath,
      currentDamages,
      currentTarget,
      currentWeaknesses
    );
    // console.log(`expected damage is ${expD}`);

    activityPath.apIds.forEach((apId) => {
      let ap = activityPaths[apId];
      let pathChance = chance;

      switch (ap.condition) {
        case conditions.ALWAYS:
          break;

        case conditions.AT_LEAST_FAIL:
          pathChance *= critSucc + succ + fail;
          break;

        case conditions.AT_LEAST_SUCC:
          pathChance *= critSucc + succ;
          break;

        case conditions.CRIF:
          pathChance *= critFail;
          break;

        case conditions.CRIT:
          pathChance *= critSucc;
          break;

        case conditions.FAIL:
          pathChance *= fail;
          break;

        case conditions.FAIL_WORSE:
          pathChance *= fail + critFail;
          break;

        case conditions.SUCC:
          pathChance *= succ;
          break;

        case conditions.SUCC_WORSE:
          pathChance *= succ + fail + critFail;
          break;

        default:
      }
      // console.log(pathChance);
      let [pathD, pathP] = evaluateActivityPath(pathChance, ap);

      expD += pathD;
      expP += pathP;
    });

    return [expD * chance, expP * chance];
  }

  let expD = 0;
  let expP = 0;
  selectedRoutine.apIds.forEach((apId) => {
    let activityPath = activityPaths[apId];
    let [thisexpD, thisexpP] = evaluateActivityPath(1, activityPath);
    expD += thisexpD;
    expP += thisexpP;
  });

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
        <p>
          {selectedRoutine.name}
          {": "}
          {addPersistent ? expD + expP * perMulti : expD}
        </p>
      </div>
      {addPersistent ? (
        ""
      ) : (
        <div>
          Expected Persistent Damage:
          <p>
            {selectedRoutine.name}
            {": "}
            {expP}
          </p>
        </div>
      )}
    </div>
  );
};

export default Display;
