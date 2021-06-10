import {
  activityTypes,
  dCond,
  defaultActivities,
  defaultValuesAC,
  defaultValuesSaves,
  defenses,
} from "./types";

export const defaultTypes = {
  [defaultActivities.FIGHTER]: activityTypes.STRIKE,
};

export const defaultTargetTypes = {
  [defaultActivities.FIGHTER]: defenses.AC,
};

export const defaultDamageConditions = {
  [defaultActivities.FIGHTER]: dCond.STRIKE,
};

const maxScore = {};
const martialProf = {};
const alchProf = {};
const casterProf = {};

const weaponItem = {};
const weaponDice = {};
const spellDice = {};

const martialSpec = {};
const casterSpec = {};

const fighterAB = {};
const fighterStatic = {};

for (let i = 1; i <= 20; i++) {
  maxScore[i] = 4;
  martialProf[i] = 2;
  alchProf[i] = 2;
  casterProf[i] = 2;

  weaponItem[i] = 0;
  weaponDice[i] = 1;

  martialSpec[i] = 0;
  casterSpec[i] = 0;

  if (i >= 2) {
    weaponItem[i] = 1;
  }
  if (i >= 4) {
    weaponDice[i] = 2;
  }
  if (i >= 5) {
    martialProf[i] = 4;
  }
  if (i >= 7) {
    alchProf[i] = 4;
    martialSpec[i] = 1;
  }
  if (i >= 10) {
    weaponItem[i] = 2;
    maxScore[i] = 5;
  }
  if (i >= 11) {
    casterProf[i] = 4;
  }
  if (i >= 12) {
    weaponDice[i] = 3;
  }
  if (i >= 13) {
    martialProf[i] = 6;
    casterSpec[i] = 1;
  }
  if (i >= 15) {
    martialSpec[i] = 2;
  }
  if (i >= 16) {
    weaponItem[i] = 3;
  }
  if (i >= 17) {
    maxScore[i] = 6;
  }
  if (i >= 19) {
    weaponDice[i] = 4;
  }
  if (i >= 20) {
    maxScore[i] = 7;
  }

  fighterAB[i] = i + martialProf[i] + maxScore[i] + weaponItem[i] + 2;
  fighterStatic[i] = maxScore[i] + (martialSpec[i] * (martialProf[i] + 2)) / 2;
}

export const defaultValues = {
  [defaultActivities.FIGHTER]: fighterAB,
};

export const defaultDiceNum = {
  [defaultActivities.FIGHTER]: weaponDice,
};

export const defaultStatic = {
  [defaultActivities.FIGHTER]: fighterStatic,
};

const extremeAC = {
  "-1": 18,
  0: 19,
  1: 19,
  2: 21,
  3: 22,
  4: 24,
  5: 25,
  6: 27,
  7: 28,
  8: 30,
  9: 31,
  10: 33,
  11: 34,
  12: 36,
  13: 37,
  14: 39,
  15: 40,
  16: 42,
  17: 43,
  18: 45,
  19: 46,
  20: 48,
  21: 49,
  22: 51,
  23: 52,
  24: 54,
};
const highAC = { ...extremeAC };
for (let level in highAC) highAC[level] -= 3;

const moderateAC = { ...extremeAC };
for (let level in moderateAC) moderateAC[level] -= 4;

const lowAC = { ...extremeAC };
for (let level in lowAC) lowAC[level] -= 6;

export const defaultACs = {
  [defaultValuesAC.EXTREME]: extremeAC,
  [defaultValuesAC.HIGH]: highAC,
  [defaultValuesAC.MODERATE]: moderateAC,
  [defaultValuesAC.LOW]: lowAC,
};

const extremeSaves = {
  "-1": 9,
  0: 10,
  1: 11,
  2: 12,
  3: 14,
  4: 15,
  5: 17,
  6: 18,
  7: 20,
  8: 21,
  9: 23,
  10: 24,
  11: 26,
  12: 27,
  13: 29,
  14: 30,
  15: 32,
  16: 33,
  17: 35,
  18: 36,
  19: 38,
  20: 39,
  21: 41,
  22: 43,
  23: 44,
  24: 46,
};
const highSaves = {
  "-1": 8,
  0: 9,
  1: 10,
  2: 11,
  3: 12,
  4: 14,
  5: 15,
  6: 17,
  7: 18,
  8: 19,
  9: 21,
  10: 22,
  11: 24,
  12: 25,
  13: 26,
  14: 28,
  15: 29,
  16: 30,
  17: 32,
  18: 33,
  19: 35,
  20: 36,
  21: 38,
  22: 39,
  23: 40,
  24: 42,
};
const moderateSaves = {
  "-1": 5,
  0: 6,
  1: 7,
  2: 8,
  3: 9,
  4: 11,
  5: 12,
  6: 14,
  7: 15,
  8: 16,
  9: 18,
  10: 19,
  11: 21,
  12: 22,
  13: 23,
  14: 25,
  15: 26,
  16: 28,
  17: 29,
  18: 30,
  19: 32,
  20: 33,
  21: 35,
  22: 36,
  23: 37,
  24: 38,
};
const lowSaves = {
  "-1": 2,
  0: 3,
  1: 4,
  2: 5,
  3: 6,
  4: 8,
  5: 9,
  6: 11,
  7: 12,
  8: 13,
  9: 15,
  10: 16,
  11: 18,
  12: 19,
  13: 20,
  14: 22,
  15: 23,
  16: 25,
  17: 26,
  18: 27,
  19: 29,
  20: 30,
  21: 32,
  22: 33,
  23: 34,
  24: 36,
};
const terribleSaves = {
  "-1": 0,
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 6,
  5: 7,
  6: 8,
  7: 10,
  8: 11,
  9: 12,
  10: 14,
  11: 15,
  12: 16,
  13: 18,
  14: 19,
  15: 20,
  16: 22,
  17: 23,
  18: 24,
  19: 26,
  20: 27,
  21: 28,
  22: 30,
  23: 31,
  24: 32,
};
export const defaultSaves = {
  [defaultValuesSaves.EXTREME]: extremeSaves,
  [defaultValuesSaves.HIGH]: highSaves,
  [defaultValuesSaves.MODERATE]: moderateSaves,
  [defaultValuesSaves.LOW]: lowSaves,
  [defaultValuesSaves.TERRIBLE]: terribleSaves,
};
