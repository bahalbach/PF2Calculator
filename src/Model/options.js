import React from "react";

import {
  activityTypes,
  bonusTrends,
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
} from "../Model/types";

export const levelOptions = [];
for (let level = 1; level <= 20; level++) {
  levelOptions.push(<option key={level}>{level}</option>);
}

export const conditionOptions = [];
for (let c in conditions) {
  conditionOptions.push(<option key={c}>{conditions[c]}</option>);
}
// const defaultActivityOptions = [];
// for (let da in defaultActivities) {
//   defaultActivityOptions.push(
//     <option key={da}>{defaultActivities[da]}</option>
//   );
// }
export const bonusTrendOptions = [];
for (let bt in bonusTrends) {
  bonusTrendOptions.push(<option key={bt}>{bonusTrends[bt]}</option>);
}
export const activityTypeOptions = [];
for (let at in activityTypes) {
  activityTypeOptions.push(<option key={at}>{activityTypes[at]}</option>);
}
export const MAPOptions = [];
for (let m in MAPs) {
  MAPOptions.push(<option key={m}>{MAPs[m]}</option>);
}
export const defenseOptions = [];
for (let d in defenses) {
  defenseOptions.push(<option key={d}>{defenses[d]}</option>);
}
export const rollOptions = [];
for (let rt in rollTypes) {
  rollOptions.push(<option key={rt}>{rollTypes[rt]}</option>);
}

export const damageConditionOptions = [];
for (let dc in dCond) {
  damageConditionOptions.push(<option key={dc}>{dCond[dc]}</option>);
}
export const dieTrendOptions = [];
for (let dt in dieTrends) {
  dieTrendOptions.push(<option key={dt}>{dieTrends[dt]}</option>);
}
// const diceNumOptions = [];
// for (let dn in diceNums) {
//   diceNumOptions.push(<option key={dn}>{dn}</option>);
// }
export const diceSizeOptions = [];
for (let ds in diceSizes) {
  diceSizeOptions.push(<option key={ds}>{ds}</option>);
}
export const damageTrendOptions = [];
for (let dt in damageTrends) {
  damageTrendOptions.push(<option key={dt}>{damageTrends[dt]}</option>);
}

export const damageTypeOptions = [];
for (let dt in damageTypes) {
  damageTypeOptions.push(<option key={dt}>{damageTypes[dt]}</option>);
}
export const materialOptions = [];
for (let m in materials) {
  materialOptions.push(<option key={m}>{materials[m]}</option>);
}
export const effectTypeOptions = [];
for (let et in effectTypes) {
  effectTypeOptions.push(<option key={et}>{effectTypes[et]}</option>);
}
export const multiplierOptions = [];
for (let m of [0.5, 1, 2]) {
  multiplierOptions.push(<option key={m}>{m}</option>);
}
