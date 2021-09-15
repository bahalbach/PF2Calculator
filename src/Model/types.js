export const graphTypes = {
  DISTRIBUTION: "Damage Distribution",
  PMDEFENSE: "+/- AC/Save Bonus",
  PMRES: "+/- Resistance/Weakness",
};

export const ACTrends = {
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  EXTREME: "Extreme",
};

export const SaveTrends = {
  TERRIBLE: "Terrible",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  EXTREME: "Extreme",
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

export const rollTypes = {
  NORMAL: "Normal",
  ADVANTAGE: "Advantage",
  DISADVANTAGE: "Disadvantage",
};

export const activityTypes = {
  STRIKE: "Strike",
  SAVE: "Save",
};

export const profTrends = {
  TRAINED: "Trained Proficiency",
  FIGHTERWEAPON: "Fighter Weapon (1, 5, 13)",
  MARTIALWEAPON: "Martial Weapon (5, 13)",
  CASTERWEAPON: "Caster Weapon (11)",
  ALCHWEAPON: "Alchemist Weapon (7)",
  CASTERSPELL: "Caster Spell (7, 15, 19)",
  MAXSKILL: "Max skill (3, 7, 15)",
};

export const statTrends = {
  AS10: "10",
  AS18a: "18 to 24 apex(17)",
  AS16a: "16 to 22 apex(17)",
  AS16pp: "16 to 20",
  AS16p: "16 to 18",
  AS14pp: "14 to 20",
  AS14p: "14 to 18",
};

export const itemTrends = {
  NONE: "None",
  WEAPON: "Weapon (2, 10, 16)",
  SKILL: "Skill (3, 9, 17)",
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

export const defenses = {
  AC: "AC",
  FORT: "Fort",
  REF: "Ref",
  WILL: "Will",
  PER: "Perception",
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

export const damageTrends = {
  NONE: "None",
  FIGHTERMELEE: "Fighter Melee",
  FIGHTERRANGED: "Fighter Ranged",
  MARTIALMELEE: "Martial Melee",
  MARTIALRANGED: "Martial Ranged",
  CASTERCANTRIP: "Caster Cantrip",
  CASTERMELEE: "Caster Melee",
  CASTERRANGED: "Caster Ranged",
};

export const dieTrends = {
  NONE: "None",
  WEAPON: "Weapon",
  SPELLLEVEL1: "1 x Spell Level",
  SPELLLEVEL2: "2 x Spell Level",
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
