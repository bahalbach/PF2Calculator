import { MenuItem } from "@mui/material";
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
  effectStateTypes,
  effectValueTypes,
  MAPs,
  materials,
  rollTypes,
  statTrends,
  itemTrends,
  ACTrends,
  SaveTrends,
  graphTypes,
} from "./types";

export const makeOptions = (options: object): JSX.Element[] => {
  let element: keyof typeof options;
  const optionElements: JSX.Element[] = [];
  // @ts-ignore
  for (element in options) {
    optionElements.push(
      <MenuItem key={element} value={options[element]}>
        {options[element]}
      </MenuItem>
    );
  }
  return optionElements;
};

export const arrayOptions = (options: string[]): JSX.Element[] => {
  const optionElements: JSX.Element[] = [];
  for (let element of options) {
    optionElements.push(
      <MenuItem key={element} value={element}>
        {element}
      </MenuItem>
    );
  }
  return optionElements;
};

let gt: keyof typeof graphTypes;
export const graphTypeOptions: JSX.Element[] = [];
for (gt in graphTypes) {
  graphTypeOptions.push(<option key={gt}>{graphTypes[gt]}</option>);
}

export const levelOptions: JSX.Element[] = [];
for (let level = 1; level <= 20; level++) {
  levelOptions.push(
    <MenuItem key={level} value={level}>
      {level}
    </MenuItem>
  );
}

let c: keyof typeof conditions;
export const conditionOptions: JSX.Element[] = [];
for (c in conditions) {
  conditionOptions.push(
    <MenuItem key={c} value={conditions[c]}>
      {conditions[c]}
    </MenuItem>
  );
}
let rt: keyof typeof rollTypes;
export const rollOptions: JSX.Element[] = [];
for (rt in rollTypes) {
  rollOptions.push(
    <MenuItem key={rt} value={rollTypes[rt]}>
      {rollTypes[rt]}
    </MenuItem>
  );
}

let at: keyof typeof activityTypes;
export const activityTypeOptions: JSX.Element[] = [];
for (at in activityTypes) {
  activityTypeOptions.push(
    <MenuItem key={at} value={activityTypes[at]}>
      {activityTypes[at]}
    </MenuItem>
  );
}

let pt: keyof typeof profTrends;
export const profTrendOptions: JSX.Element[] = [];
for (pt in profTrends) {
  profTrendOptions.push(
    <MenuItem key={pt} value={profTrends[pt]}>
      {profTrends[pt]}
    </MenuItem>
  );
}
let st: keyof typeof statTrends;
export const statTrendOptions: JSX.Element[] = [];
for (st in statTrends) {
  statTrendOptions.push(
    <MenuItem key={st} value={statTrends[st]}>
      {statTrends[st]}
    </MenuItem>
  );
}
let it: keyof typeof itemTrends;
export const itemBTrendOptions: JSX.Element[] = [];
for (it in itemTrends) {
  itemBTrendOptions.push(
    <MenuItem key={it} value={itemTrends[it]}>
      {itemTrends[it]}
    </MenuItem>
  );
}

let m: keyof typeof MAPs;
export const MAPOptions: JSX.Element[] = [];
for (m in MAPs) {
  MAPOptions.push(
    <MenuItem key={m} value={MAPs[m]}>
      {MAPs[m]}
    </MenuItem>
  );
}
let d: keyof typeof defenses;
export const defenseOptions: JSX.Element[] = [];
for (d in defenses) {
  defenseOptions.push(
    <MenuItem key={d} value={defenses[d]}>
      {defenses[d]}
    </MenuItem>
  );
}
let act: keyof typeof ACTrends;
export const ACOptions: JSX.Element[] = [];
for (act in ACTrends) {
  ACOptions.push(
    <MenuItem key={act} value={ACTrends[act]}>
      {ACTrends[act]}
    </MenuItem>
  );
}
let svt: keyof typeof SaveTrends;
export const SaveOptions: JSX.Element[] = [];
for (svt in SaveTrends) {
  SaveOptions.push(
    <MenuItem key={svt} value={SaveTrends[svt]}>
      {SaveTrends[svt]}
    </MenuItem>
  );
}

let dc: keyof typeof dCond;
export const damageConditionOptions: JSX.Element[] = [];
for (dc in dCond) {
  damageConditionOptions.push(
    <MenuItem key={dc} value={dCond[dc]}>
      {dCond[dc]}
    </MenuItem>
  );
}
let dieT: keyof typeof dieTrends;
export const dieTrendOptions: JSX.Element[] = [];
for (dieT in dieTrends) {
  dieTrendOptions.push(
    <MenuItem key={dieT} value={dieTrends[dieT]}>
      {dieTrends[dieT]}
    </MenuItem>
  );
}
let ds: keyof typeof diceSizes;
export const diceSizeOptions: JSX.Element[] = [];
for (ds in diceSizes) {
  diceSizeOptions.push(
    <MenuItem key={ds} value={ds}>
      {"d" + ds}
    </MenuItem>
  );
}
let damT: keyof typeof damageTrends;
export const damageTrendOptions: JSX.Element[] = [];
for (damT in damageTrends) {
  damageTrendOptions.push(
    <MenuItem key={damT} value={damageTrends[damT]}>
      {damageTrends[damT]}
    </MenuItem>
  );
}

let dt: keyof typeof damageTypes;
export const damageTypeOptions: JSX.Element[] = [];
for (dt in damageTypes) {
  damageTypeOptions.push(
    <MenuItem key={dt} value={damageTypes[dt]}>
      {damageTypes[dt]}
    </MenuItem>
  );
}
let mat: keyof typeof materials;
export const materialOptions: JSX.Element[] = [];
for (mat in materials) {
  materialOptions.push(
    <MenuItem key={mat} value={materials[mat]}>
      {materials[mat]}
    </MenuItem>
  );
}
export const weaknessOptions: JSX.Element[] = [];
for (dt in damageTypes) {
  weaknessOptions.push(
    <MenuItem key={dt} value={damageTypes[dt]}>
      {damageTypes[dt]}
    </MenuItem>
  );
}
for (mat in materials) {
  if (materials[mat] === materials.NONE) continue;
  weaknessOptions.push(
    <MenuItem key={mat} value={materials[mat]}>
      {materials[mat]}
    </MenuItem>
  );
}

export const multiplierOptions: JSX.Element[] = [];
for (let m of [0.5, 1, 2]) {
  multiplierOptions.push(
    <MenuItem key={m} value={m}>
      {m}
    </MenuItem>
  );
}

export const effectTypeOptions: JSX.Element[] = [];
let est: keyof typeof effectStateTypes;
for (est in effectStateTypes) {
  effectTypeOptions.push(
    <MenuItem key={est} value={effectStateTypes[est]}>
      {effectStateTypes[est]}
    </MenuItem>
  );
}
let evt: keyof typeof effectValueTypes;
for (evt in effectValueTypes) {
  effectTypeOptions.push(
    <MenuItem key={evt} value={effectValueTypes[evt]}>
      {effectValueTypes[evt]}
    </MenuItem>
  );
}
