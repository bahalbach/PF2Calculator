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
import { defenses, graphTypes } from "../types";
const Plot = createPlotlyComponent(Plotly);

const Display = () => {
  // evaluates routines and displays appropriate graphs

  const [addPersistent, setAddPersistent] = useState(false);
  const [graphType, setGraphType] = useState(graphTypes.DISTRIBUTION);
  // const [perMulti, setPerMulti] = useState(2);

  const routines = useSelector(selectRoutineEntities);
  const activityPaths = useSelector(selectactivityPathEntities);
  const targets = useSelector(selecttargetEntities);
  const damages = useSelector(selectdamageEntities);
  const weaknesses = useSelector(selectweaknessEntities);

  const currentTarget = targets[0];
  let title = "Expected Damage";
  if (
    graphType === graphTypes.DISTRIBUTION ||
    graphType === graphTypes.PMDEFENSE
  ) {
    title += " Vs ";
    title += " AC: " + currentTarget[defenses.AC];
    title += " Fort: " + currentTarget[defenses.FORT];
    title += " Ref: " + currentTarget[defenses.REF];
    title += " Will: " + currentTarget[defenses.WILL];
    title += " Per: " + currentTarget[defenses.PER];
  } else if (graphType === graphTypes.BYLEVEL) {
  }

  const evaluator = new ActivityPathEvaluator(
    activityPaths,
    targets,
    damages,
    weaknesses
  );

  let minbonus = 0;
  let maxbonus = 0;
  if (graphType === graphTypes.PMDEFENSE) {
    minbonus = -5;
    maxbonus = 5;
  }

  let maxDamage = 0;
  let maxPDamage = 0;
  const datasets = [];
  const perDatasets = [];
  const expectedDamages = [];
  const expectedPersistentDamages = [];

  // go through routines, evaluate them, and put data together for use in charts
  for (let id in routines) {
    let routine = routines[id];
    if (!routine.display) continue;

    const bonusArray = [];
    const expDbyBonus = [];
    const expPDbyBonus = [];
    // if not doing a +/- graph, bonus is just 0
    for (let bonus = minbonus; bonus <= maxbonus; bonus++) {
      bonusArray.push(bonus);
      // calculate distribution for this routine with this bonus
      let expD = 0;
      let expP = 0;
      let routineDDist = [1];
      let routinePDDist = [1];
      for (let i = 0; i < routine.apIds.length; i++) {
        let activityPath = activityPaths[routine.apIds[i]];
        let [damageDist, PdamageDist] = evaluator.evalPath(activityPath, bonus);
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
        if (graphType === graphTypes.DISTRIBUTION) {
          dataArray.push(i);
          cumulative.push(currentSum);
          currentSum -= routineDDist[i];
        }
        expD += routineDDist[i] * i;
      }
      currentSum = 1;
      for (let i = 0; i < routinePDDist.length; i++) {
        if (graphType === graphTypes.DISTRIBUTION) {
          PdataArray.push(i);
          Pcumulative.push(currentSum);
          currentSum -= routinePDDist[i];
        }
        expP += routinePDDist[i] * i;
      }

      // add data depending on chart type
      if (bonus === 0) {
        expectedDamages.push(
          <div key={routine.id}>
            {routine.name}
            {": "}
            {expD.toFixed(2)}
          </div>
        );
        expectedPersistentDamages.push(
          <div key={routine.id}>
            {routine.name}
            {": "}
            {expP.toFixed(2)}
          </div>
        );
      }
      if (graphType === graphTypes.DISTRIBUTION) {
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
      } else if (graphType === graphTypes.PMDEFENSE) {
        expDbyBonus.push(expD);
        expPDbyBonus.push(expP);
      }
    }
    if (graphType === graphTypes.PMDEFENSE) {
      datasets.push({
        type: "scatter",
        name: routine.name,
        x: bonusArray,
        y: expDbyBonus,
        yaxis: "y",
      });
      perDatasets.push({
        type: "scatter",
        name: routine.name,
        x: bonusArray,
        y: expPDbyBonus,
        yaxis: "y",
      });
    }
  }
  // Done evaluating routines and putting data together

  // create appropriate labels and charts
  const labels = [];
  const Plabels = [];
  let xtitle;
  let ytitle;
  if (graphType === graphTypes.DISTRIBUTION) {
    xtitle = "damage";
    ytitle = "chance";
    for (let i = 0; i <= maxDamage; i++) {
      labels.push(i);
    }
    for (let i = 0; i <= maxPDamage; i++) {
      Plabels.push(i);
    }
  } else if (graphType === graphTypes.PMDEFENSE) {
    xtitle = "+/- AC/Save Bonus";
    ytitle = "Expected Damage";
    for (let i = minbonus; i <= maxbonus; i++) {
      labels.push(i);
      Plabels.push(i);
    }
  }

  let damageChart = (
    <Plot
      classname="plot"
      data={datasets}
      layout={{
        title: title,
        autosize: true,
        xaxis: { title: xtitle },
        yaxis: { title: ytitle },
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
  );
  let persistentDamageChart = (
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
  );

  const graphTypeOptions = [];
  for (let gt in graphTypes) {
    graphTypeOptions.push(<option key={gt}>{graphTypes[gt]}</option>);
  }

  return (
    <div className="box">
      {"Graph Type: "}
      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        {graphTypeOptions}
      </select>
      {" Show persistent damage: "}
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
      {damageChart}
      {!addPersistent ? (
        ""
      ) : (
        <div>
          <div>
            Expected Persistent Damage:
            {expectedPersistentDamages}
          </div>
          {persistentDamageChart}
        </div>
      )}
    </div>
  );
};

export default Display;
