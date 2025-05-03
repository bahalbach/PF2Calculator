import React from "react";

import {
  selectactivityPathEntities,
  selectSelectedRoutine,
} from "../Routines/RoutineSlice/routineSlice";
import { Routine } from "../Routines/RoutineSlice/RoutineTypes";
import { selectdamageEntities } from "../Routines/RoutineSlice/routineSlice";
// import { selectRoutineEntities } from "../Routines/RoutineSlice/routineSlice";
import { selectCurrentTabRoutineEntities } from "./tabSlice";
import { selecttargetEntities } from "./targetSlice";
import { selectweaknessEntities } from "./weaknessSlice";
import { graphTypes } from "../Model/types";
import { selecteffectEntities } from "../Routines/RoutineSlice/routineSlice";

import { ActivityPathEvaluator } from "../Calculation/EvaluateActivityPath";

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { Dictionary } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { graphSaved, singleLevelGraphSaved } from "./sharingSlice";
const Plot = createPlotlyComponent(Plotly);

const useGenerateGraphs = (graphType: string) => {
  const routines = useAppSelector(selectCurrentTabRoutineEntities);
  const activityPaths = useAppSelector(selectactivityPathEntities);
  const targets = useAppSelector(selecttargetEntities);
  const damages = useAppSelector(selectdamageEntities);
  const effects = useAppSelector(selecteffectEntities);
  const weaknesses = useAppSelector(selectweaknessEntities);
  const selectedRoutine = useAppSelector(selectSelectedRoutine);

  const dispatch = useAppDispatch();

  const saveGraph = (_figure: any, graphDiv: Plotly.Root) => {
    Plotly.toImage(graphDiv, {
      format: "png",
      height: 1000,
      width: 1000,
    }).then((url) => {
      dispatch(graphSaved(url));
    });
  };
  const saveSingleLevelGraph = (_figure: any, graphDiv: Plotly.Root) => {
    Plotly.toImage(graphDiv, {
      format: "png",
      height: 1000,
      width: 1000,
    }).then((url) => {
      dispatch(singleLevelGraphSaved(url));
    });
  };

  const evaluator = new ActivityPathEvaluator(
    activityPaths,
    targets,
    damages,
    effects,
    weaknesses,
    selectedRoutine
  );

  const currentTarget = targets[0]!;
  let title = "@" + currentTarget.routineLevel;
  let byLevelTile = currentTarget.name;

  title += " Vs";
  if (currentTarget.flatfooted) title += " flatfooted";
  title += " AC: " + currentTarget.overrideAC; //+ defaultACs[currentTarget.ACTrend][displayLevel];
  title += " F: " + currentTarget.overrideFort; //+ defaultSaves[currentTarget.FortTrend][displayLevel];
  title += " R: " + currentTarget.overrideRef; //+ defaultSaves[currentTarget.RefTrend][displayLevel];
  title += " W: " + currentTarget.overrideWill; //+ defaultSaves[currentTarget.WillTrend][displayLevel];
  title += " P: " + currentTarget.overridePer; //+ defaultSaves[currentTarget.PerTrend][displayLevel];

  let datasets: Plotly.Data[] = [];
  let expectedDamages;

  switch (graphType) {
    case graphTypes.DISTRIBUTION:
      ({ expectedDamages, datasets } = evaluateDistribution(
        routines,
        evaluator
      ));
      break;
    case graphTypes.PMDEFENSE:
      ({ expectedDamages, datasets } = evaluatePM(routines, evaluator, true));
      break;
    case graphTypes.PMRES:
    default:
      ({ expectedDamages, datasets } = evaluatePM(routines, evaluator, false));
      break;
  }
  let { datasets: byLeveldatasets } = evaluateByLevel(routines, evaluator);

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
      className="plot"
      data={datasets}
      layout={{
        title: title,
        autosize: true,
        xaxis: { title: xtitle },
        yaxis: { title: ytitle },
        legend: {
          x: 0,
          y: -0.2,
          xanchor: "left",
          yanchor: "top",
        },
        margin: {
          l: 40,
          r: 40,
        },
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
      onInitialized={saveSingleLevelGraph}
      onUpdate={saveSingleLevelGraph}
    />
  );

  let byLevelDamageChart = (
    <Plot
      className="plot"
      data={byLeveldatasets}
      layout={{
        title: byLevelTile,
        autosize: true,
        xaxis: { title: "Level" },
        yaxis: { title: "Expected Damage" },
        legend: {
          x: 0,
          y: -0.2,
          xanchor: "left",
          yanchor: "top",
        },
        margin: {
          l: 40,
          r: 40,
        },
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
      onInitialized={saveGraph}
      onUpdate={saveGraph}
    />
  );
  return {
    expectedDamages,
    damageChart,
    byLevelDamageChart,
  };
};

const evaluateByLevel = (
  routines: Dictionary<Routine>,
  evaluator: ActivityPathEvaluator
) => {
  let datasets = [];

  // Evaluate the selected routine first so we can display other routines as a % of that
  const selectedRoutineDamage: { [key: number]: number } = {};
  if (
    evaluator.target.percentSelectedRoutine &&
    evaluator.selectedRoutine !== undefined
  ) {
    let routine = routines[evaluator.selectedRoutine]!;
    for (let level = 1; level <= 20; level++) {
      if (!evaluator.canEvaluate(level, routine)) continue;
      let { expD } = evaluator.evalRoutine(routine, 0, 0, level);
      selectedRoutineDamage[level] = expD;
    }
  }

  for (let id in routines) {
    let routine = routines[id]!;
    if (!routine.display) continue;

    const levelArray = [];
    const expDbyLevel = [];
    for (let level = 1; level <= 20; level++) {
      if (!evaluator.canEvaluate(level, routine)) continue;

      let { expD } = evaluator.evalRoutine(routine, 0, 0, level);
      if (evaluator.target.percentSelectedRoutine) {
        if (level in selectedRoutineDamage) {
          levelArray.push(level);
          expDbyLevel.push(expD / selectedRoutineDamage[level]);
        }
      } else {
        levelArray.push(level);
        expDbyLevel.push(expD);
      }
    }
    datasets.push({
      type: "scatter",
      name: routine.name,
      x: levelArray,
      y: expDbyLevel,
      yaxis: "y",
    } as const);
  }

  return { datasets };
};

const evaluatePM = (
  routines: Dictionary<Routine>,
  evaluator: ActivityPathEvaluator,
  defense = true
) => {
  let datasets = [];
  let expectedDamages = [];

  for (let id in routines) {
    let routine = routines[id]!;
    if (!routine.display) continue;
    if (!evaluator.canEvaluateSingleLevel(routine)) continue;

    const bonusArray = [];
    const expDbyBonus = [];

    for (let bonus = -5; bonus <= 5; bonus++) {
      bonusArray.push(bonus);
      let { expD } = evaluator.evalRoutine(
        routine,
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
      }

      expDbyBonus.push(expD);
    }

    datasets.push({
      type: "scatter",
      name: routine.name,
      x: bonusArray,
      y: expDbyBonus,
      yaxis: "y",
    } as const);
  }
  return { expectedDamages, datasets };
};

const evaluateDistribution = (
  routines: Dictionary<Routine>,
  evaluator: ActivityPathEvaluator
) => {
  let datasets = [];
  let expectedDamages = [];

  for (let id in routines) {
    let routine = routines[id]!;
    if (!routine.display) continue;
    if (!evaluator.canEvaluateSingleLevel(routine)) continue;
    let { expD, dataArray, routineDDist, cumulative } = evaluator.evalRoutine(
      routine,
      0,
      0
    );
    expectedDamages.push(
      <div key={routine.id}>
        {routine.name}
        {": "}
        {expD.toFixed(2)}
      </div>
    );
    datasets.push({
      type: "scatter",
      name: routine.name,
      x: dataArray,
      y: cumulative,
      yaxis: "y",
    } as const);
    datasets.push({
      type: "bar",
      name: expD.toFixed(2),
      x: dataArray,
      y: routineDDist,
    } as const);
  }
  return { expectedDamages, datasets };
};

export default useGenerateGraphs;
