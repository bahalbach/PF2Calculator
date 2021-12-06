import {
  ACTrends,
  profTrends,
  damageTrends,
  dieTrends,
  SaveTrends,
  statTrends,
  itemTrends,
} from "./types";

interface defaultValue {
  [x: number]: number;
}

export const proficiencyValues = (levels: number[]) => {
  return valuesFromBonusLevels(levels.concat(levels), true);
};

export const valuesFromBonusLevels = (levels: number[], addLevel = false) => {
  let currentValue = 0;
  let values: defaultValue = {};
  for (let i = 1; i <= 20; i++) {
    for (let level of levels) {
      if (level === i) {
        currentValue += 1;
      }
    }
    values[i] = addLevel ? currentValue + i : currentValue;
  }
  return values;
};
export const valuesFromBonuses = (bonuses: [number, number][]) => {
  let currentValue = 0;
  let values: defaultValue = {};
  for (let i = 1; i <= 20; i++) {
    for (let bonus of bonuses) {
      if (bonus[0] === i) {
        currentValue += bonus[1];
      }
    }
    values[i] = currentValue;
  }
  return values;
};

const zero: defaultValue = {};
const level: defaultValue = {};
const halfLevel: defaultValue = {};

const trained: defaultValue = {};
const maxSkill: defaultValue = {};

const maxScore: defaultValue = {};
const score16pp: defaultValue = {};
const score16p: defaultValue = {};
const score16: defaultValue = {};
const score14p: defaultValue = {};
const score14: defaultValue = {};
const score12: defaultValue = {};
const score10: defaultValue = {};
const DexNimbleAC: defaultValue = {};
const StrSavageAC: defaultValue = {};

const martialProf: defaultValue = {};
const alchProf: defaultValue = {};
const casterProf: defaultValue = {};

const spellProf: defaultValue = {};

const weaponItem: defaultValue = {};
const skillItem: defaultValue = {};
const bomb: defaultValue = {};
const mutagen: defaultValue = {};

const weaponDice: defaultValue = {};
const spellDice: defaultValue = {};
const spellDice2: defaultValue = {};
for (let i = 1; i <= 20; i++) {
  spellDice[i] = Math.floor((i + 1) / 2);
  spellDice2[i] = 2 * Math.floor((i + 1) / 2);
}
const runes: defaultValue = {};
const runes2: defaultValue = {};
const deadly: defaultValue = {};

const sneak: defaultValue = {};
const strategic: defaultValue = {};
const precise: defaultValue = {};

const kiStrike: defaultValue = {};

const preEdge1: defaultValue = {};
const preEdge2: defaultValue = {};
const preEdge3: defaultValue = {};

const acDice: defaultValue = {};

const martialSpec: defaultValue = {};
const casterSpec: defaultValue = {};

const constructDamage: defaultValue = {};
const nimbleDamage: defaultValue = {};
const savageDamage: defaultValue = {};

const bombPlusSplash: defaultValue = {};

const rage: defaultValue = {};
const animalrage: defaultValue = {};
const dragonrage: defaultValue = {};
const giantrage: defaultValue = {};
const spiritrage: defaultValue = {};

const arcaneCascade: defaultValue = {};

const overdriveSuccess: defaultValue = {};
const overdriveCritical: defaultValue = {};

const implementEmpower: defaultValue = {};

const fighterAB: defaultValue = {};
const martialAB: defaultValue = {};
const casterAB: defaultValue = {};
const alchAB: defaultValue = {};

const casterSpellAttack: defaultValue = {};
const casterSaveDC: defaultValue = {};
const classdc1: defaultValue = {};
const classdc2: defaultValue = {};
const mcspell: defaultValue = {};

const ACunarmedPro: defaultValue = {};
const ACathleticsProf: defaultValue = {};

const fighterStatic: defaultValue = {};
const fighterRanged: defaultValue = {};
const martialStatic: defaultValue = {};
const martialRanged: defaultValue = {};
const casterStatic: defaultValue = {};
const casterRanged: defaultValue = {};

for (let i = 1; i <= 20; i++) {
  zero[i] = 0;
  level[i] = i;
  halfLevel[i] = Math.floor(i / 2);
  trained[i] = i + 2;
  maxSkill[i] = i + 2;

  maxScore[i] = 4;
  score16pp[i] = 3;
  score16p[i] = 3;
  score16[i] = 3;
  score14p[i] = 2;
  score14[i] = 2;
  score12[i] = 1;
  score10[i] = 0;
  DexNimbleAC[i] = 3;
  StrSavageAC[i] = 3;

  martialProf[i] = 2;
  alchProf[i] = 2;
  casterProf[i] = 2;

  spellProf[i] = 2;
  classdc1[i] = i + 2;
  classdc2[i] = i + 2;
  mcspell[i] = i + 2;

  ACunarmedPro[i] = i + 2;
  ACathleticsProf[i] = i + 2;

  weaponItem[i] = 0;
  skillItem[i] = 0;
  bomb[i] = 0;
  mutagen[i] = 1;

  weaponDice[i] = 1;
  runes[i] = 0;
  runes2[i] = 0;
  deadly[i] = 1;

  sneak[i] = 1;
  strategic[i] = 1;
  precise[i] = 2;

  kiStrike[i] = 1;

  acDice[i] = 1;

  preEdge1[i] = 1;
  preEdge2[i] = 0;
  preEdge3[i] = 0;

  martialSpec[i] = 0;
  casterSpec[i] = 0;

  constructDamage[i] = 3;
  nimbleDamage[i] = 2;
  savageDamage[i] = 3;

  bombPlusSplash[i] = 1;

  rage[i] = 2;
  animalrage[i] = 2;
  dragonrage[i] = 4;
  giantrage[i] = 6;
  spiritrage[i] = 3;

  arcaneCascade[i] = 1;

  overdriveSuccess[i] = 2;
  overdriveCritical[i] = 4;

  implementEmpower[i] = 2;

  if (i >= 2) {
    weaponItem[i] = 1;
  }
  if (i >= 3) {
    maxSkill[i] = i + 4;
    skillItem[i] = 1;
    bomb[i] = 1;
    mutagen[i] = 2;

    bombPlusSplash[i] = 2;

    overdriveSuccess[i] = 3;
    overdriveCritical[i] = 5;

    implementEmpower[i] = 4;
  }
  if (i >= 4) {
    weaponDice[i] = 2;
    acDice[i] = 2;

    constructDamage[i] = 4;
    nimbleDamage[i] = 3;
    savageDamage[i] = 4;

    bombPlusSplash[i] = 4;

    DexNimbleAC[i] = 4;
    StrSavageAC[i] = 4;
  }
  if (i >= 5) {
    martialProf[i] = 4;
    score16pp[i] = 4;
    score16p[i] = 4;
    score16[i] = 4;
    score14p[i] = 3;
    score14[i] = 3;
    score12[i] = 2;
    score10[i] = 1;

    sneak[i] = 2;
    strategic[i] = 2;
    precise[i] = 3;
  }
  if (i >= 7) {
    alchProf[i] = 4;
    martialSpec[i] = 1;
    spellProf[i] = 4;
    maxSkill[i] = i + 6;

    rage[i] = 6;
    animalrage[i] = 5;
    dragonrage[i] = 8;
    giantrage[i] = 10;
    spiritrage[i] = 7;

    arcaneCascade[i] = 2;

    overdriveSuccess[i] = 4;
    overdriveCritical[i] = 6;
  }
  if (i >= 8) {
    ACathleticsProf[i] = i + 4;

    runes[i] = 1;
    runes2[i] = 1;

    constructDamage[i] = 8;
    nimbleDamage[i] = 6;
    savageDamage[i] = 9;

    DexNimbleAC[i] = 6;
    StrSavageAC[i] = 6;
  }
  if (i >= 9) {
    skillItem[i] = 2;
    classdc1[i] = i + 4;

    strategic[i] = 3;
    precise[i] = 4;

    kiStrike[i] = 2;
  }
  if (i >= 10) {
    weaponItem[i] = 2;
    maxScore[i] = 5;
    score14p[i] = 4;
    score14[i] = 4;
    score12[i] = 3;
    score10[i] = 2;

    runes2[i] = 2;

    bombPlusSplash[i] = 7;

    overdriveCritical[i] = 7;
  }
  if (i >= 11) {
    casterProf[i] = 4;
    classdc2[i] = i + 4;

    bomb[i] = 2;
    mutagen[i] = 3;

    bombPlusSplash[i] = 8;

    sneak[i] = 3;
    implementEmpower[i] = 6;

    preEdge1[i] = 2;
  }
  if (i >= 12) {
    weaponDice[i] = 3;
    mcspell[i] = i + 4;
    deadly[i] = 2;
  }
  if (i >= 13) {
    martialProf[i] = 6;
    casterSpec[i] = 1;

    strategic[i] = 4;
    precise[i] = 5;
  }
  if (i >= 14) {
    ACunarmedPro[i] = i + 4;
    ACathleticsProf[i] = i + 6;

    acDice[i] = 3;
    constructDamage[i] = 11;
    nimbleDamage[i] = 8;
    savageDamage[i] = 13;

    DexNimbleAC[i] = 8;
    StrSavageAC[i] = 7;
  }
  if (i >= 15) {
    martialSpec[i] = 2;
    score16pp[i] = 5;
    score16p[i] = 5;
    score12[i] = 4;
    score10[i] = 3;
    spellProf[i] = 6;
    maxSkill[i] = i + 8;
    runes[i] = 2;

    rage[i] = 12;
    animalrage[i] = 12;
    dragonrage[i] = 16;
    giantrage[i] = 18;
    spiritrage[i] = 13;

    arcaneCascade[i] = 1;

    overdriveSuccess[i] = 5;
    overdriveCritical[i] = 8;
  }
  if (i >= 16) {
    weaponItem[i] = 3;
    runes2[i] = 3;
  }
  if (i >= 17) {
    score16pp[i] = 6;
    maxScore[i] = 6;
    skillItem[i] = 3;
    classdc1[i] = i + 6;
    bomb[i] = 3;
    mutagen[i] = 4;
    bombPlusSplash[i] = 10;

    sneak[i] = 4;
    strategic[i] = 5;
    precise[i] = 6;

    kiStrike[i] = 3;

    preEdge2[i] = 1;

    overdriveSuccess[i] = 6;
    overdriveCritical[i] = 9;
  }
  if (i >= 18) {
    mcspell[i] = i + 6;
  }
  if (i >= 19) {
    weaponDice[i] = 4;
    spellProf[i] = 8;
    classdc2[i] = i + 6;
    deadly[i] = 3;

    implementEmpower[i] = 8;

    preEdge1[i] = 3;
    preEdge2[i] = 2;
    preEdge3[i] = 1;
  }
  if (i >= 20) {
    maxScore[i] = 7;
    score10[i] = 4;
    bombPlusSplash[i] = 11;

    overdriveCritical[i] = 10;
  }

  fighterAB[i] = i + martialProf[i] + 2;
  martialAB[i] = i + martialProf[i];
  casterAB[i] = i + casterProf[i];
  alchAB[i] = i + alchProf[i];
  casterSpellAttack[i] = i + spellProf[i];
  casterSaveDC[i] = 10 + i + spellProf[i] + maxScore[i];

  fighterStatic[i] = maxScore[i] + (martialSpec[i] * (martialProf[i] + 2)) / 2;
  fighterRanged[i] = (martialSpec[i] * (martialProf[i] + 2)) / 2;
  martialStatic[i] = maxScore[i] + (martialSpec[i] * martialProf[i]) / 2;
  martialRanged[i] = (martialSpec[i] * martialProf[i]) / 2;
  casterStatic[i] = score16[i] + (casterSpec[i] * casterProf[i]) / 2;
  casterRanged[i] = (casterSpec[i] * casterProf[i]) / 2;
}
export const profTrendValues = {
  [profTrends.UNTRAINED]: valuesFromBonusLevels([]),
  [profTrends.TRAINED]: proficiencyValues([1]),
  [profTrends.FIGHTERWEAPON]: proficiencyValues([1, 1, 5, 13]),
  [profTrends.MARTIALWEAPON]: proficiencyValues([1, 5, 13]),
  [profTrends.CASTERWEAPON]: proficiencyValues([1, 11]),
  [profTrends.ALCHWEAPON]: proficiencyValues([1, 7]),
  [profTrends.CASTERSPELL]: proficiencyValues([1, 7, 15, 19]),
  [profTrends.CLASSDC1]: proficiencyValues([1, 9, 17]),
  [profTrends.CLASSDC2]: proficiencyValues([1, 11, 19]),
  [profTrends.MCSPELL]: proficiencyValues([1, 12, 18]),
  [profTrends.MAXSKILL]: proficiencyValues([1, 3, 7, 15]),
  [profTrends.ANIMALCOMPANION]: proficiencyValues([1, 14]),
  [profTrends.SAVAGEACATHLETICS]: proficiencyValues([1, 4, 14]),
};
export const statTrendValues = {
  [statTrends.AS10]: valuesFromBonusLevels([]),
  [statTrends.AS18]: valuesFromBonusLevels([1, 1, 1, 1, 10, 20]),
  [statTrends.AS18a]: valuesFromBonusLevels([1, 1, 1, 1, 10, 17, 20]),
  [statTrends.AS16a]: valuesFromBonusLevels([1, 1, 1, 5, 15, 17]),
  [statTrends.AS16pp]: valuesFromBonusLevels([1, 1, 1, 5, 15]),
  [statTrends.AS16p]: valuesFromBonusLevels([1, 1, 1, 5]),
  [statTrends.AS14pp]: valuesFromBonusLevels([1, 1, 5, 10, 20]),
  [statTrends.AS14p]: valuesFromBonusLevels([1, 1, 5, 10]),
  [statTrends.AS12p]: valuesFromBonusLevels([1, 5, 10, 15]),
  [statTrends.AS10p]: valuesFromBonusLevels([5, 10, 15, 20]),
  [statTrends.NIMBLEAC]: DexNimbleAC,
  [statTrends.SAVAGEAC]: StrSavageAC,
};
export const itemTrendValues = {
  [itemTrends.NONE]: valuesFromBonusLevels([]),
  [itemTrends.WEAPON]: weaponItem,
  [itemTrends.SKILL]: skillItem,
  [itemTrends.BOMB]: bomb,
  [itemTrends.MUTAGEN]: mutagen,
};

export const MAPvalues = {
  "0 (0x-5)": 0,
  "-5 (1x-5)": -5,
  "-10 (2x-5)": -10,
  "0 (0x-4)": 0,
  "-4 (1x-4)": -4,
  "-8 (2x-4)": -8,
  "0 (0x-3)": 0,
  "-3 (1x-3)": -3,
  "-6 (2x-3)": -6,
  "0 (0x-2)": 0,
  "-2 (1x-2)": -2,
  "-4 (2x-2)": -4,
  "0 (0x-1)": 0,
  "-1 (1x-1)": -1,
  "-2 (2x-1)": -2,
};

export const dieTrendValues = {
  [dieTrends.NONE]: zero,
  [dieTrends.WEAPON]: weaponDice,
  [dieTrends.SPELLLEVEL1]: spellDice,
  [dieTrends.SPELLLEVEL2]: spellDice2,
  [dieTrends.LEVEL]: level,
  [dieTrends.HALFLEVEL]: halfLevel,
  [dieTrends.RUNE]: runes,
  [dieTrends.RUNE2]: runes2,
  [dieTrends.DEADLY]: deadly,
  [dieTrends.BOMB]: mutagen,
  [dieTrends.SNEAK]: sneak,
  [dieTrends.STRATEGIC]: strategic,
  [dieTrends.PRECISE]: precise,
  [dieTrends.PRECISIONEDGE]: preEdge1,
  [dieTrends.PRECISIONEDGE2]: preEdge2,
  [dieTrends.PRECISIONEDGE3]: preEdge3,
  [dieTrends.KISTRIKE]: kiStrike,
  [dieTrends.ANIMALCOMPANION]: acDice,
};

export const damageTrendValues = {
  ...statTrendValues,
  [damageTrends.NONE]: zero,
  [damageTrends.FIGHTERWEAPONSPEC]: fighterRanged,
  [damageTrends.MARTIALWEAPONSPEC]: martialRanged,
  [damageTrends.CASTERWEAPONSPEC]: casterRanged,
  [damageTrends.WEAPON]: weaponDice,
  [damageTrends.SPELLLEVEL1]: spellDice,
  [damageTrends.LEVEL]: level,
  [damageTrends.HALFLEVEL]: halfLevel,
  [damageTrends.BOMB]: mutagen,
  [damageTrends.BOMBPLUS]: bombPlusSplash,
  [damageTrends.RAGE]: rage,
  [damageTrends.ANIMALRAGE]: animalrage,
  [damageTrends.DRAGONRAGE]: dragonrage,
  [damageTrends.GIANTRAGE]: giantrage,
  [damageTrends.SPIRITRAGE]: spiritrage,
  [damageTrends.PRECISE]: precise,
  [damageTrends.ARCANECASCADE]: arcaneCascade,
  [damageTrends.OVERDRIVES]: overdriveSuccess,
  [damageTrends.OVERDRIVEC]: overdriveCritical,
  [damageTrends.IMPLEMENT]: implementEmpower,
  [damageTrends.CONSTRUCT]: constructDamage,
  [damageTrends.NIMBLE]: nimbleDamage,
  [damageTrends.SAVAGE]: savageDamage,
};

const extremeAC: defaultValue = {
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

const extremeSaves: defaultValue = {
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
const highSaves: defaultValue = {
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
const moderateSaves: defaultValue = {
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
const lowSaves: defaultValue = {
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
const terribleSaves: defaultValue = {
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
export const standardDC: defaultValue = {
  "-1": 12,
  0: 14,
  1: 15,
  2: 16,
  3: 18,
  4: 19,
  5: 20,
  6: 22,
  7: 23,
  8: 24,
  9: 26,
  10: 27,
  11: 28,
  12: 30,
  13: 31,
  14: 32,
  15: 34,
  16: 35,
  17: 36,
  18: 38,
  19: 39,
  20: 40,
  21: 42,
  22: 44,
  23: 46,
  24: 48,
  25: 50,
} as const;
