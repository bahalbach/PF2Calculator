import React from "react";

import {
  activityTypes,
  profTrends,
  conditions,
  damageTrends,
  damageTypes,
  dCond,
  defenses,
  diceSizes,
  dieTrends,
  effectTypes,
  MAPs,
  materials,
  rollTypes,
  statTrends,
  itemTrends,
  ACTrends,
  SaveTrends,
  graphTypes,
} from "./types";

let gt: keyof typeof graphTypes;
export const graphTypeOptions: JSX.Element[] = [];
for (gt in graphTypes) {
  graphTypeOptions.push(<option key={gt}>{graphTypes[gt]}</option>);
}

export const levelOptions: JSX.Element[] = [];
for (let level = 1; level <= 20; level++) {
  levelOptions.push(<option key={level}>{level}</option>);
}

let c: keyof typeof conditions;
export const conditionOptions: JSX.Element[] = [];
for (c in conditions) {
  conditionOptions.push(<option key={c}>{conditions[c]}</option>);
}
let rt: keyof typeof rollTypes;
export const rollOptions: JSX.Element[] = [];
for (rt in rollTypes) {
  rollOptions.push(<option key={rt}>{rollTypes[rt]}</option>);
}

let at: keyof typeof activityTypes;
export const activityTypeOptions: JSX.Element[] = [];
for (at in activityTypes) {
  activityTypeOptions.push(<option key={at}>{activityTypes[at]}</option>);
}

let pt: keyof typeof profTrends;
export const profTrendOptions: JSX.Element[] = [];
for (pt in profTrends) {
  profTrendOptions.push(<option key={pt}>{profTrends[pt]}</option>);
}
let st: keyof typeof statTrends;
export const statTrendOptions: JSX.Element[] = [];
for (st in statTrends) {
  statTrendOptions.push(<option key={st}>{statTrends[st]}</option>);
}
let it: keyof typeof itemTrends;
export const itemBTrendOptions: JSX.Element[] = [];
for (it in itemTrends) {
  itemBTrendOptions.push(<option key={it}>{itemTrends[it]}</option>);
}

let m: keyof typeof MAPs;
export const MAPOptions: JSX.Element[] = [];
for (m in MAPs) {
  MAPOptions.push(<option key={m}>{MAPs[m]}</option>);
}
let d: keyof typeof defenses;
export const defenseOptions: JSX.Element[] = [];
for (d in defenses) {
  defenseOptions.push(<option key={d}>{defenses[d]}</option>);
}
let act: keyof typeof ACTrends;
export const ACOptions: JSX.Element[] = [];
for (act in ACTrends) {
  ACOptions.push(<option key={act}>{ACTrends[act]}</option>);
}
let svt: keyof typeof SaveTrends;
export const SaveOptions: JSX.Element[] = [];
for (svt in SaveTrends) {
  SaveOptions.push(<option key={svt}>{SaveTrends[svt]}</option>);
}

let dc: keyof typeof dCond;
export const damageConditionOptions: JSX.Element[] = [];
for (dc in dCond) {
  damageConditionOptions.push(<option key={dc}>{dCond[dc]}</option>);
}
let dieT: keyof typeof dieTrends;
export const dieTrendOptions: JSX.Element[] = [];
for (dieT in dieTrends) {
  dieTrendOptions.push(<option key={dieT}>{dieTrends[dieT]}</option>);
}
let ds: keyof typeof diceSizes;
export const diceSizeOptions: JSX.Element[] = [];
for (ds in diceSizes) {
  diceSizeOptions.push(<option key={ds}>{ds}</option>);
}
let damT: keyof typeof damageTrends;
export const damageTrendOptions: JSX.Element[] = [];
for (damT in damageTrends) {
  damageTrendOptions.push(<option key={damT}>{damageTrends[damT]}</option>);
}

let dt: keyof typeof damageTypes;
export const damageTypeOptions: JSX.Element[] = [];
for (dt in damageTypes) {
  damageTypeOptions.push(<option key={dt}>{damageTypes[dt]}</option>);
}
let mat: keyof typeof materials;
export const materialOptions: JSX.Element[] = [];
for (mat in materials) {
  materialOptions.push(<option key={mat}>{materials[mat]}</option>);
}
export const weaknessOptions: JSX.Element[] = [];
for (dt in damageTypes) {
  weaknessOptions.push(<option key={dt}>{damageTypes[dt]}</option>);
}
for (mat in materials) {
  if (materials[mat] === materials.NONE) continue;
  weaknessOptions.push(<option key={mat}>{materials[mat]}</option>);
}

export const multiplierOptions: JSX.Element[] = [];
for (let m of [0.5, 1, 2]) {
  multiplierOptions.push(<option key={m}>{m}</option>);
}
let et: keyof typeof effectTypes;
export const effectTypeOptions: JSX.Element[] = [];
for (et in effectTypes) {
  effectTypeOptions.push(<option key={et}>{effectTypes[et]}</option>);
}
