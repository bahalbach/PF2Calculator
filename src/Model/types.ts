export const graphTypes = {
  DISTRIBUTION: "Damage Distribution",
  PMDEFENSE: "+/- AC/Save Bonus",
  PMRES: "+/- Resistance/Weakness",
} as const;
export type GraphType = typeof graphTypes[keyof typeof graphTypes];

export const importStates = {
  Importing: "Importing",
  Successful: "Successful",
  Failure: "Failure",
  MessageSeen: "Message Seen",
} as const;
export type ImportStates = typeof importStates[keyof typeof importStates];

export const ACTrends = {
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  EXTREME: "Extreme",
} as const;
export type ACTrend = typeof ACTrends[keyof typeof ACTrends];

export const SaveTrends = {
  TERRIBLE: "Terrible",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  EXTREME: "Extreme",
} as const;
export type SaveTrend = typeof SaveTrends[keyof typeof SaveTrends];

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
} as const;
export type Condition = typeof conditions[keyof typeof conditions];

export const rollTypes = {
  NORMAL: "Normal",
  ADVANTAGE: "Advantage",
  DISADVANTAGE: "Disadvantage",
} as const;
export type RollType = typeof rollTypes[keyof typeof rollTypes];

export const activityTypes = {
  STRIKE: "Strike",
  SAVE: "Save",
  SKILL: "Skill Check",
  SPELLATTACK: "Spell Attack",
} as const;
export type ActivityType = typeof activityTypes[keyof typeof activityTypes];

export const profTrends = {
  TRAINED: "Trained Proficiency",
  FIGHTERWEAPON: "Fighter Weapon (1, 5, 13)",
  MARTIALWEAPON: "Martial Weapon (5, 13)",
  CASTERWEAPON: "Caster Weapon (11)",
  ALCHWEAPON: "Alchemist Weapon (7)",
  CASTERSPELL: "Caster Spell (7, 15, 19)",
  CLASSDC1: "Class/Spell (9, 17)",
  CLASSDC2: "Class/Spell (11, 19)",
  MCSPELL: "MC Spell (12, 18)",
  MAXSKILL: "Max skill (3, 7, 15)",
} as const;
export type ProfTrend = typeof profTrends[keyof typeof profTrends];

export const statTrends = {
  AS10: "10",
  AS18a: "18 to 24 apex(17)",
  AS16a: "16 to 22 apex(17)",
  AS16pp: "16 to 20",
  AS16p: "16 to 18",
  AS14pp: "14 to 20",
  AS14p: "14 to 18",
} as const;
export type StatTrend = typeof statTrends[keyof typeof statTrends];

export const itemTrends = {
  NONE: "None",
  WEAPON: "Weapon (2, 10, 16)",
  SKILL: "Skill (3, 9, 17)",
} as const;
export type ItemTrend = typeof itemTrends[keyof typeof itemTrends];

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
} as const;
export type MAP = typeof MAPs[keyof typeof MAPs];

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
} as const;

export const defenses = {
  AC: "AC",
  FORT: "Fort",
  REF: "Ref",
  WILL: "Will",
  PER: "Perception",
  DC: "Standard DC",
} as const;
export type Defense = typeof defenses[keyof typeof defenses];

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
} as const;
export type DamageCond = typeof dCond[keyof typeof dCond];

export const dieTrends = {
  NONE: "None",
  WEAPON: "Weapon (1, 4, 12, 19)",
  SPELLLEVEL1: "1 x Spell Level",
  SPELLLEVEL2: "2 x Spell Level",
  LEVEL: "Level",
  HALFLEVEL: "1/2 Level",
  RUNE: "Runes (8, 15)",
  RUNE2: "Runes (8, 10, 16)",
  DEADLY: "Deadly (1, 12, 19)",
  SNEAK: "Sneak Attack (1, 5, 11, 17)",
  STRATEGIC: "Strategic Strike (1, 5, 9, 13, 17)",
  PRECISE: "Precise Strike (1, 1, 5, 9, 13, 17)",
  PRECISIONEDGE: "Precision Edge 1(1, 11, 19)",
  PRECISIONEDGE2: "Precision Edge 2(17, 19)",
  PRECISIONEDGE3: "Precision Edge 3(19)",
} as const;
export type DieTrend = typeof dieTrends[keyof typeof dieTrends];

export const damageTrends = {
  NONE: "None",
  FIGHTERWEAPONSPEC: "Fighter Weapon Specialization",
  MARTIALWEAPONSPEC: "Martial Weapon Specializaton",
  CASTERWEAPONSPEC: "Caster Weapon Specializaton",
  ...statTrends,
  WEAPON: "Weapon (1, 4, 12, 19)",
  SPELLLEVEL1: "1 x Spell Level",
  LEVEL: "Level",
  HALFLEVEL: "1/2 Level",
  RAGE: "Rage",
  ANIMALRAGE: "Animal Rage",
  DRAGONRAGE: "Dragon Rage",
  GIANTRAGE: "Giant Rage",
  IMPLEMENT: "Implement's Empowerment",
} as const;
export type DamageTrend = typeof damageTrends[keyof typeof damageTrends];

export const damageTypes = {
  NONE: "None",
  B: "bludgeoning",
  P: "piercing",
  S: "slashing",
  FIRE: "fire",
  PRECISION: "precision",
} as const;
export type DamageType = typeof damageTypes[keyof typeof damageTypes];

export const materials = {
  NONE: "none",
  COLD_IRON: "cold iron",
  SILVER: "silver",
  ADAMANTINE: "adamantine",
} as const;
export type Material = typeof materials[keyof typeof materials];

export const effectStateTypes = {
  FLATFOOT: "Flatfooted",
  PRONE: "Prone",
  GRAPPLED: "Grappled",
  RESTRAINED: "Restrained",
} as const;
export type EffectStateType =
  typeof effectStateTypes[keyof typeof effectStateTypes];
export const effectValueTypes = {
  FRIGHTENED: "Frightened",
  CLUMSY: "Clumsy",
} as const;
export type EffectValueType =
  typeof effectValueTypes[keyof typeof effectValueTypes];
export const effectTypes = {
  ...effectStateTypes,
  ...effectValueTypes,
} as const;
export type EffectType = EffectStateType | EffectValueType;

export const whenConditions = {
  Always: "Always",

  ...effectStateTypes,
  ...effectValueTypes,
} as const;
export type WhenConditions = typeof whenConditions[keyof typeof whenConditions];

export type TargetState = {
  [key in EffectValueType]: number;
} & {
  [key in EffectStateType]: boolean;
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
} as const;

export const diceSizes = {
  "4": 4,
  "6": 6,
  "8": 8,
  "10": 10,
  "12": 12,
} as const;
