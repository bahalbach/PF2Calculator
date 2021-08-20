export const graphTypes = {
  DISTRIBUTION: "Damage Distribution",
  PMDEFENSE: "+/- AC/Save Bonus",
  PMRES: "+/- Resistance/Weakness",
};

export const activityTypes = {
  STRIKE: "Strike",
  SAVE: "Save",
};

export const defaultActivities = {
  FIGHTER: "Fighter Melee",
  MARTIAL: "Martial Melee",
  CASTER: "Caster(16str) Melee",
  ALCH: "Alchemist(16str) Melee",
  FIGHTERR: "Fighter Ranged",
  MARTIALR: "Martial Ranged",
  CASTERR: "Caster(16dex) Ranged",
  ALCHR: "Alchemist(16dex) Ranged",
  CASTERCA: "Caster Cantrip Attack",
  CASTERCS: "Caster Cantrip Save",
  CASTERBR: "Caster 2dX Basic Save",
  CASTERSA: "Caster Spell Attack",
  CASTERS: "Caster Save",
};

export const defaultValuesAC = {
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  EXTREME: "Extreme",
};

export const defaultValuesSaves = {
  TERRIBLE: "Terrible",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  EXTREME: "Extreme",
};

export const defenses = {
  AC: "AC",
  FORT: "Fort",
  REF: "Ref",
  WILL: "Will",
  PER: "Perception",
};

export const MAPs = {
  N1: "0 (0x-5)",
  N2: "-5 (1x-5)",
  N3: "-10 (2x-5)",
  A1: "0 (0x-4)",
  A2: "-4 (1x-4)",
  A3: "-8 (2x-4)",
  R1: "0 (0x-3)",
  R2: "-3 (1x-3)",
  R3: "-6 (2x-3)",
  RA1: "0 (0x-2)",
  RA2: "-2 (1x-2)",
  RA3: "-4 (2x-2)",
  RAA1: "0 (0x-1)",
  RAA2: "-1 (1x-1)",
  RAA3: "-2 (2x-1)",
};

export const nextMAPs = {
  "0 (0x-5)": "-5 (1x-5)",
  "-5 (1x-5)": "-10 (2x-5)",
  "-10 (2x-5)": "-10 (2x-5)",
  "0 (0x-4)": "-4 (1x-4)",
  "-4 (1x-4)": "-8 (2x-4)",
  "-8 (2x-4)": "-8 (2x-4)",
  "0 (0x-3)": "-3 (1x-3)",
  "-3 (1x-3)": "-6 (2x-3)",
  "-6 (2x-3)": "-6 (2x-3)",
  "0 (0x-2)": "-2 (1x-2)",
  "-2 (1x-2)": "-4 (2x-2)",
  "-4 (2x-2)": "-4 (2x-2)",
  "0 (0x-1)": "-1 (1x-1)",
  "-1 (1x-1)": "-2 (2x-1)",
  "-2 (2x-1)": "-2 (2x-1)",
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

export const rollTypes = {
  NORMAL: "Normal",
  ADVANTAGE: "Advantage",
  DISADVANTAGE: "Disadvantage",
};

export const damageTypes = {
  NONE: "None",
  B: "bludgeoning",
  P: "piercing",
  S: "slashing",
  FIRE: "fire",
};

export const materials = {
  NONE: "none",
  COLD_IRON: "cold iron",
  SILVER: "silver",
  ADAMANTINE: "adamantine",
};

export const effectTypes = {
  FLATFOOT: "Flatfooted",
  FRIGHTENED1: "Frightened 1",
  FRIGHTENED2: "Frightened 2",
  FRIGHTENED3: "Frightened 3",
  FRIGHTENED4: "Frightened 4",
};

export const conditions = {
  ALWAYS: "Always",
  CRIT: "On Crit",
  SUCC: "On Success",
  FAIL: "On Failure",
  CRIF: "On Crit Fail",
  AT_LEAST_SUCC: "Success or better",
  AT_LEAST_FAIL: "Failure or better",
  FAIL_WORSE: "Failure or worse",
  SUCC_WORSE: "Success or worse",
};

export const dCond = {
  STRIKE: "x1 hit, x2 crit",
  BASIC: "Basic save",
  ALWAYS: "Always",
  CRIT: "On Crit",
  SUCC: "On Success",
  FAIL: "On Failure",
  CRIF: "On Crit Fail",
  AT_LEAST_SUCC: "Success or better",
  AT_LEAST_FAIL: "Failure or better",
  FAIL_WORSE: "Failure or worse",
  SUCC_WORSE: "Success or worse",
};

export const diceNums = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
};

export const diceSizes = {
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
};
