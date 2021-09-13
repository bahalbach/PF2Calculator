import {
  activityTypes,
  ACTrends,
  bonusTrends,
  damageTrends,
  dCond,
  defaultActivities,
  defenses,
  dieTrends,
  SaveTrends,
} from "./types";

export const defaultTypes = {
  [defaultActivities.FIGHTER]: activityTypes.STRIKE,
  [defaultActivities.MARTIAL]: activityTypes.STRIKE,
  [defaultActivities.CASTER]: activityTypes.STRIKE,
  [defaultActivities.ALCH]: activityTypes.STRIKE,
  [defaultActivities.FIGHTERR]: activityTypes.STRIKE,
  [defaultActivities.MARTIALR]: activityTypes.STRIKE,
  [defaultActivities.CASTERR]: activityTypes.STRIKE,
  [defaultActivities.ALCHR]: activityTypes.STRIKE,
  [defaultActivities.CASTERCA]: activityTypes.STRIKE,
  [defaultActivities.CASTERCS]: activityTypes.SAVE,
  [defaultActivities.CASTERSA]: activityTypes.STRIKE,
  [defaultActivities.CASTERS]: activityTypes.SAVE,
  [defaultActivities.CASTERBR]: activityTypes.SAVE,
};

export const defaultTargetTypes = {
  [defaultActivities.FIGHTER]: defenses.AC,
  [defaultActivities.MARTIAL]: defenses.AC,
  [defaultActivities.CASTER]: defenses.AC,
  [defaultActivities.ALCH]: defenses.AC,
  [defaultActivities.FIGHTERR]: defenses.AC,
  [defaultActivities.MARTIALR]: defenses.AC,
  [defaultActivities.CASTERR]: defenses.AC,
  [defaultActivities.ALCHR]: defenses.AC,
  [defaultActivities.CASTERCA]: defenses.AC,
  [defaultActivities.CASTERCS]: defenses.REF,
  [defaultActivities.CASTERSA]: defenses.AC,
  [defaultActivities.CASTERS]: defenses.REF,
  [defaultActivities.CASTERBR]: defenses.REF,
};

export const defaultDamageConditions = {
  [defaultActivities.FIGHTER]: dCond.STRIKE,
  [defaultActivities.MARTIAL]: dCond.STRIKE,
  [defaultActivities.CASTER]: dCond.STRIKE,
  [defaultActivities.ALCH]: dCond.STRIKE,
  [defaultActivities.FIGHTERR]: dCond.STRIKE,
  [defaultActivities.MARTIALR]: dCond.STRIKE,
  [defaultActivities.CASTERR]: dCond.STRIKE,
  [defaultActivities.ALCHR]: dCond.STRIKE,
  [defaultActivities.CASTERC]: dCond.STRIKE,
  [defaultActivities.CASTERS]: dCond.BASIC,
  [defaultActivities.CASTERCA]: dCond.STRIKE,
  [defaultActivities.CASTERCS]: dCond.BASIC,
  [defaultActivities.CASTERSA]: dCond.STRIKE,
  [defaultActivities.CASTERS]: dCond.BASIC,
  [defaultActivities.CASTERBR]: dCond.BASIC,
};

const zero = {};

const maxScore = {};
const score16 = {};
const martialProf = {};
const alchProf = {};
const casterProf = {};

const spellProf = {};

const weaponItem = {};
const weaponDice = {};
const spellDice = {};
const spellDice2 = {};
for (let i = 1; i <= 20; i++) {
  spellDice[i] = Math.floor((i + 1) / 2);
  spellDice2[i] = 2 * Math.floor((i + 1) / 2);
}

const martialSpec = {};
const casterSpec = {};

const fighterAB = {};
const martialAB = {};
const casterAB = {};
const alchAB = {};

const casterSpellAttack = {};
const casterSaveDC = {};

const fighterStatic = {};
const fighterRanged = {};
const martialStatic = {};
const martialRanged = {};
const casterStatic = {};
const casterRanged = {};

for (let i = 1; i <= 20; i++) {
  zero[i] = 0;

  maxScore[i] = 4;
  score16[i] = 3;

  martialProf[i] = 2;
  alchProf[i] = 2;
  casterProf[i] = 2;

  spellProf[i] = 2;

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
    score16[i] = 4;
  }
  if (i >= 7) {
    alchProf[i] = 4;
    martialSpec[i] = 1;
    spellProf[i] = 4;
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
    score16[i] = 5;
    spellProf[i] = 6;
  }
  if (i >= 16) {
    weaponItem[i] = 3;
  }
  if (i >= 17) {
    maxScore[i] = 6;
  }
  if (i >= 19) {
    weaponDice[i] = 4;
    spellProf[i] = 8;
  }
  if (i >= 20) {
    maxScore[i] = 7;
  }

  fighterAB[i] = i + martialProf[i] + maxScore[i] + weaponItem[i] + 2;
  martialAB[i] = i + martialProf[i] + maxScore[i] + weaponItem[i];
  casterAB[i] = i + casterProf[i] + score16[i] + weaponItem[i];
  alchAB[i] = i + alchProf[i] + score16[i] + weaponItem[i];
  casterSpellAttack[i] = i + spellProf[i] + maxScore[i];
  casterSaveDC[i] = 10 + i + spellProf[i] + maxScore[i];

  fighterStatic[i] = maxScore[i] + (martialSpec[i] * (martialProf[i] + 2)) / 2;
  fighterRanged[i] = (martialSpec[i] * (martialProf[i] + 2)) / 2;
  martialStatic[i] = maxScore[i] + (martialSpec[i] * martialProf[i]) / 2;
  martialRanged[i] = (martialSpec[i] * martialProf[i]) / 2;
  casterStatic[i] = score16[i] + (casterSpec[i] * casterProf[i]) / 2;
  casterRanged[i] = (casterSpec[i] * casterProf[i]) / 2;
}
export const bonusTrendValues = {
  [bonusTrends.FIGHTERWEAPON]: fighterAB,
  [bonusTrends.MARTIALWEAPON]: martialAB,
  [bonusTrends.CASTERWEAPON]: casterAB,
  [bonusTrends.DC171519]: casterSpellAttack,
};

export const damageTrendValues = {
  [damageTrends.NONE]: zero,
  [damageTrends.FIGHTERMELEE]: fighterStatic,
  [damageTrends.MARTIALMELEE]: martialStatic,
  [damageTrends.CASTERMELEE]: casterStatic,
  [damageTrends.FIGHTERRANGED]: fighterRanged,
  [damageTrends.MARTIALRANGED]: martialRanged,
  [damageTrends.CASTERRANGED]: casterRanged,
  [damageTrends.CASTERCANTRIP]: maxScore,
};

export const dieTrendValues = {
  [dieTrends.NONE]: zero,
  [dieTrends.WEAPON]: weaponDice,
  [dieTrends.SPELLLEVEL1]: spellDice,
  [dieTrends.SPELLLEVEL2]: spellDice2,
};

export const defaultValues = {
  [defaultActivities.FIGHTER]: fighterAB,
  [defaultActivities.MARTIAL]: martialAB,
  [defaultActivities.CASTER]: casterAB,
  [defaultActivities.ALCH]: alchAB,
  [defaultActivities.FIGHTERR]: fighterAB,
  [defaultActivities.MARTIALR]: martialAB,
  [defaultActivities.CASTERR]: casterAB,
  [defaultActivities.ALCHR]: alchAB,
  [defaultActivities.CASTERCA]: casterSpellAttack,
  [defaultActivities.CASTERCS]: casterSaveDC,
  [defaultActivities.CASTERSA]: casterSpellAttack,
  [defaultActivities.CASTERS]: casterSaveDC,
  [defaultActivities.CASTERBR]: casterSaveDC,
};

export const defaultDiceNum = {
  [defaultActivities.FIGHTER]: weaponDice,
  [defaultActivities.MARTIAL]: weaponDice,
  [defaultActivities.CASTER]: weaponDice,
  [defaultActivities.ALCH]: weaponDice,
  [defaultActivities.FIGHTERR]: weaponDice,
  [defaultActivities.MARTIALR]: weaponDice,
  [defaultActivities.CASTERR]: weaponDice,
  [defaultActivities.ALCHR]: weaponDice,
  [defaultActivities.CASTERCA]: spellDice,
  [defaultActivities.CASTERCS]: spellDice,
  [defaultActivities.CASTERSA]: zero,
  [defaultActivities.CASTERS]: zero,
  [defaultActivities.CASTERBR]: spellDice2,
};

export const defaultStatic = {
  [defaultActivities.FIGHTER]: fighterStatic,
  [defaultActivities.MARTIAL]: martialStatic,
  [defaultActivities.CASTER]: casterStatic,
  [defaultActivities.ALCH]: casterStatic,
  [defaultActivities.FIGHTERR]: fighterRanged,
  [defaultActivities.MARTIALR]: martialRanged,
  [defaultActivities.CASTERR]: casterRanged,
  [defaultActivities.ALCHR]: casterRanged,
  [defaultActivities.CASTERCA]: maxScore,
  [defaultActivities.CASTERCS]: maxScore,
  [defaultActivities.CASTERSA]: zero,
  [defaultActivities.CASTERS]: zero,
  [defaultActivities.CASTERBR]: zero,
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
  [ACTrends.EXTREME]: extremeAC,
  [ACTrends.HIGH]: highAC,
  [ACTrends.MODERATE]: moderateAC,
  [ACTrends.LOW]: lowAC,
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
  [SaveTrends.EXTREME]: extremeSaves,
  [SaveTrends.HIGH]: highSaves,
  [SaveTrends.MODERATE]: moderateSaves,
  [SaveTrends.LOW]: lowSaves,
  [SaveTrends.TERRIBLE]: terribleSaves,
};
