import React from "react";
import { useSelector } from "react-redux";
import { selectactivityPathEntities } from "../Routine/activityPathSlice";
import { selectdamageEntities } from "../Routine/damageSlice";
import { selectRoutineEntities } from "../Routine/routineSlice";
import { selecttargetEntities } from "../Target/targetSlice";
import { selectweaknessEntities } from "../Target/weaknessSlice";
import { graphTypes } from "../types";
import { selecteffectEntities } from "../Routine/effectSlice";

import { ActivityPathEvaluator } from "../Calculation/EvaluateActivityPath";

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { defaultACs, defaultSaves } from "../defaults";
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
  let title = "";
  let byLevelTile = "";

  title += " Vs ";
  title += " AC: " + defaultACs[currentTarget.ACTrend][displayLevel];
  title += " Fort: " + defaultSaves[currentTarget.FortTrend][displayLevel];
  title += " Ref: " + defaultSaves[currentTarget.RefTrend][displayLevel];
  title += " Will: " + defaultSaves[currentTarget.WillTrend][displayLevel];
  title += " Per: " + defaultSaves[currentTarget.PerTrend][displayLevel];

  byLevelTile += " Vs ";
  byLevelTile += " AC: " + currentTarget.ACTrend;
  byLevelTile += " Fort: " + currentTarget.FortTrend;
  byLevelTile += " Ref: " + currentTarget.RefTrend;
  byLevelTile += " Will: " + currentTarget.WillTrend;
  byLevelTile += " Per: " + currentTarget.PerTrend;

  let datasets;
  let perDatasets;
  let expectedDamages;
  let expectedPersistentDamages;
  switch (graphType) {
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
  let { datasets: byLeveldatasets, perDatasets: byLevelperDatasets } =
    evaluateByLevel(routines, evaluator);

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
  let byLevelDamageChart = (
    <Plot
      classname="plot"
      data={byLeveldatasets}
      layout={{
        title: byLevelTile,
        autosize: true,
        xaxis: { title: "Level" },
        yaxis: { title: "Expected Damage" },
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
  let byLevelPerDamageChart = (
    <Plot
      classname="plot"
      data={byLevelperDatasets}
      layout={{
        title: byLevelTile,
        autosize: true,
        xaxis: { title: "Level" },
        yaxis: { title: "Expected Persistent Damage" },
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
    byLevelDamageChart,
    byLevelPerDamageChart,
  };
};

const evaluateByLevel = (routines, evaluator) => {
  let datasets = [];
  let perDatasets = [];

  for (let id in routines) {
    let routine = routines[id];
    if (!routine.display) continue;

    const levelArray = [];
    const expDbyLevel = [];
    const expPDbyLevel = [];
    for (let level = 1; level <= 20; level++) {
      levelArray.push(level);
      let { expD, expP } = evaluator.evalRoutine(routine, level, 0, 0);
      expDbyLevel.push(expD);
      expPDbyLevel.push(expP);
    }
    datasets.push({
      type: "scatter",
      name: routine.name,
      x: levelArray,
      y: expDbyLevel,
      yaxis: "y",
    });
    perDatasets.push({
      type: "scatter",
      name: routine.name,
      x: levelArray,
      y: expPDbyLevel,
      yaxis: "y",
    });
  }

  return { datasets, perDatasets };
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
