import React, { useState } from "react";
import { useSelector } from "react-redux";
import { convolve } from "../Calculation/Distribution";
import { selectactivityPathEntities } from "../Routine/activityPathSlice";
import { selectdamageEntities } from "../Routine/damageSlice";
import { selectRoutineEntities } from "../Routine/routineSlice";
import { selecttargetEntities } from "../Target/targetSlice";
import { selectweaknessEntities } from "../Target/weaknessSlice";

import ActivityPathEvaluator from "../Calculation/EvaluateActivityPath";

// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { defenses } from "../types";
const Plot = createPlotlyComponent(Plotly);

const Display = () => {
  // const [width, setWidth] = useState(0);
  // const ref = useRef(null);
  // useLayoutEffect(() => setWidth(ref.current.clientWidth), []);

  const [addPersistent, setAddPersistent] = useState(false);
  const [perMulti, setPerMulti] = useState(2);

  const routines = useSelector(selectRoutineEntities);
  const activityPaths = useSelector(selectactivityPathEntities);
  const targets = useSelector(selecttargetEntities);
  const damages = useSelector(selectdamageEntities);
  const weaknesses = useSelector(selectweaknessEntities);

  const currentTarget = targets[0];
  let title = "Expected Damage Vs";
  title += " AC: " + currentTarget[defenses.AC];
  title += " Fort: " + currentTarget[defenses.FORT];
  title += " Ref: " + currentTarget[defenses.REF];
  title += " Will: " + currentTarget[defenses.WILL];
  title += " Per: " + currentTarget[defenses.PER];
  // const selectedRoutine = routines[useSelector(selectSelectedRoutine)];
  const evaluator = new ActivityPathEvaluator(
    activityPaths,
    targets,
    damages,
    weaknesses
  );

  let maxDamage = 0;
  let maxPDamage = 0;
  const datasets = [];
  const perDatasets = [];
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
      let [damageDist, PdamageDist] = evaluator.evalPath(activityPath);
      routineDDist = convolve(routineDDist, damageDist);
      routinePDDist = convolve(routinePDDist, PdamageDist);
    }
    maxDamage = Math.max(maxDamage, routineDDist.length - 1);
    maxPDamage = Math.max(maxPDamage, routinePDDist.length - 1);
    const dataArray = [];
    const cumulative = [];
    const PdataArray = [];
    const Pcumulative = [];
    let currentSum = 1;
    for (let i = 0; i < routineDDist.length; i++) {
      // dataArray.push({ x: i, y: routineDDist[i] });
      dataArray.push(i);
      cumulative.push(currentSum);
      currentSum -= routineDDist[i];

      expD += routineDDist[i] * i;
    }
    currentSum = 1;
    for (let i = 0; i < routinePDDist.length; i++) {
      // dataArray.push({ x: i, y: routineDDist[i] });
      PdataArray.push(i);
      Pcumulative.push(currentSum);
      currentSum -= routinePDDist[i];

      expP += routinePDDist[i] * i;
    }
    datasets.push({
      type: "scatter",
      name: routine.name,
      x: dataArray,
      y: cumulative,
      yaxis: "y",
    });
    datasets.push({
      type: "bar",
      name: expD.toFixed(2),
      x: dataArray,
      y: routineDDist,
    });
    perDatasets.push({
      type: "scatter",
      name: routine.name,
      x: PdataArray,
      y: Pcumulative,
    });
    perDatasets.push({
      type: "bar",
      name: expP.toFixed(2),
      x: PdataArray,
      y: routinePDDist,
    });
    // datasets.push(<VerticalRectSeries data={dataArray} key={id} />);
    // datasets.push({
    //   fill: "origin",
    //   label: routine.name,
    //   data: dataArray,
    //   xAxisID: "damage",
    //   yAxisID: "chance",
    //   spanGaps: false,
    // });
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
        {expD.toFixed(2)}
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
        {expP.toFixed(2)}
      </div>
    );
  }
  const labels = [];
  for (let i = 0; i <= maxDamage; i++) {
    labels.push(i);
  }
  const Plabels = [];
  for (let i = 0; i <= maxPDamage; i++) {
    Plabels.push(i);
  }

  // const data = {
  //   labels,
  //   datasets,
  // };

  return (
    <div className="box">
      Show persistent damage:
      <input
        type="checkbox"
        checked={addPersistent}
        onChange={(e) => setAddPersistent(e.target.checked)}
      />
      {/* , persistent damage multiplier:
      <input
        type="number"
        value={perMulti ? perMulti : 0}
        onChange={(e) => setPerMulti(e.target.valueAsNumber)}
      /> */}
      <div>
        Expected Damage:
        {expectedDamages}
      </div>
      <Plot
        classname="plot"
        data={datasets}
        layout={{
          title: title,
          autosize: true,
          xaxis: { title: "damage" },
          yaxis: { title: "chance" },
          legend: {
            x: 1,
            y: 1,
            xanchor: "right",
          },
          margin: {
            l: 40,
            r: 40,
          },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
      {/* <Bar data={data} /> */}
      {/* <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {datasets}
      </XYPlot> */}
      {!addPersistent ? (
        ""
      ) : (
        <div>
          <div>
            Expected Persistent Damage:
            {expectedPersistentDamages}
          </div>
          <Plot
            classname="plot"
            data={perDatasets}
            layout={{
              title: "Expected Persistent Damage",
              autosize: true,
              xaxis: { title: "persistent damage" },
              yaxis: { title: "chance" },
              legend: {
                x: 1,
                y: 1,
                xanchor: "right",
              },
              margin: {
                l: 40,
                r: 40,
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default Display;
