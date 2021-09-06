import React from "react";
import { useSelector } from "react-redux";
import { selectactivityPathEntities } from "../Routine/activityPathSlice";
import { selectdamageEntities } from "../Routine/damageSlice";
import { selectRoutineEntities } from "../Routine/routineSlice";
import { selecttargetEntities } from "../Target/targetSlice";
import { selectweaknessEntities } from "../Target/weaknessSlice";
import { defenses, graphTypes } from "../types";
import { selecteffectEntities } from "../Routine/effectSlice";

import { ActivityPathEvaluator } from "../Calculation/EvaluateActivityPath";

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const useGenerateGraphs = (graphType, displayLevel) => {
  const routines = useSelector(selectRoutineEntities);
  const activityPaths = useSelector(selectactivityPathEntities);
  const targets = useSelector(selecttargetEntities);
  const damages = useSelector(selectdamageEntities);
  const effects = useSelector(selecteffectEntities);
  const weaknesses = useSelector(selectweaknessEntities);

  const evaluator = new ActivityPathEvaluator(
    activityPaths,
    targets,
    damages,
    effects,
    weaknesses
  );

  const currentTarget = targets[0];
  let title = "Expected Damage";
  if (
    graphType === graphTypes.DISTRIBUTION ||
    graphType === graphTypes.PMDEFENSE ||
    graphType === graphTypes.PMRES
  ) {
    title += " Vs ";
    title += " AC: " + currentTarget[defenses.AC];
    title += " Fort: " + currentTarget[defenses.FORT];
    title += " Ref: " + currentTarget[defenses.REF];
    title += " Will: " + currentTarget[defenses.WILL];
    title += " Per: " + currentTarget[defenses.PER];
  } else if (graphType === graphTypes.BYLEVEL) {
    title += " Vs ";
    title += " AC: " + defenses.AC;
    title += " Fort: " + defenses.FORT;
    title += " Ref: " + defenses.REF;
    title += " Will: " + defenses.WILL;
    title += " Per: " + defenses.PER;
  }

  let datasets;
  let perDatasets;
  let expectedDamages;
  let expectedPersistentDamages;
  switch (graphType) {
    case graphTypes.BYLEVEL:
      ({ expectedDamages, expectedPersistentDamages, datasets, perDatasets } =
        evaluateByLevel(evaluator));
      break;
    case graphTypes.DISTRIBUTION:
      ({ expectedDamages, expectedPersistentDamages, datasets, perDatasets } =
        evaluateDistribution(routines, evaluator, displayLevel));
      break;
    case graphTypes.PMDEFENSE:
      ({ expectedDamages, expectedPersistentDamages, datasets, perDatasets } =
        evaluatePM(routines, evaluator, displayLevel, true));
      break;
    case graphTypes.PMRES:
      ({ expectedDamages, expectedPersistentDamages, datasets, perDatasets } =
        evaluatePM(routines, evaluator, displayLevel, false));
      break;
    default:
      break;
  }

  // let maxDamage = 0;
  // let maxPDamage = 0;

  // go through routines, evaluate them, and put data together for use in charts
  // Done evaluating routines and putting data together

  let xtitle;
  let ytitle;
  if (graphType === graphTypes.DISTRIBUTION) {
    xtitle = "damage";
    ytitle = "chance";
  } else if (graphType === graphTypes.PMDEFENSE) {
    xtitle = "+/- AC/Save Bonus";
    ytitle = "Expected Damage";
  } else if (graphType === graphTypes.PMRES) {
    xtitle = "+/- Resistance/Weakness";
    ytitle = "Expected Damage";
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
  return {
    expectedDamages,
    expectedPersistentDamages,
    damageChart,
    persistentDamageChart,
  };
};

const evaluateByLevel = (routines, evaluator) => {
  let datasets = [];
  let perDatasets = [];
  let expectedDamages = [];
  let expectedPersistentDamages = [];

  const labels = [];
  for (let level = 1; level <= 20; level++) {
    labels.push(level);
    for (let id in routines) {
      let routine = routines[id];
      if (!routine.display) continue;
      evaluator.evalRoutine();
    }
  }
  return {};
};

const evaluatePM = (routines, evaluator, displayLevel, defense = true) => {
  let datasets = [];
  let perDatasets = [];
  let expectedDamages = [];
  let expectedPersistentDamages = [];

  for (let id in routines) {
    let routine = routines[id];
    if (!routine.display) continue;

    const bonusArray = [];
    const expDbyBonus = [];
    const expPDbyBonus = [];

    for (let bonus = -5; bonus <= 5; bonus++) {
      bonusArray.push(bonus);
      let { expD, expP } = evaluator.evalRoutine(
        routine,
        displayLevel,
        defense ? bonus : 0,
        defense ? 0 : bonus
      );

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

      expDbyBonus.push(expD);
      expPDbyBonus.push(expP);
    }

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
  return { expectedDamages, expectedPersistentDamages, datasets, perDatasets };
};

const evaluateDistribution = (routines, evaluator, displayLevel) => {
  let datasets = [];
  let perDatasets = [];
  let expectedDamages = [];
  let expectedPersistentDamages = [];

  for (let id in routines) {
    let routine = routines[id];
    if (!routine.display) continue;
    let {
      expD,
      expP,
      dataArray,
      routineDDist,
      cumulative,
      PdataArray,
      routinePDDist,
      Pcumulative,
    } = evaluator.evalRoutine(routine, displayLevel, 0, 0);
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
  }
  return { expectedDamages, expectedPersistentDamages, datasets, perDatasets };
};

export default useGenerateGraphs;
