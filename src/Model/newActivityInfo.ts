import { statTrendValues } from "./defaults";
import {
  DamageTrend,
  damageTrends,
  DieTrend,
  dieTrends,
  MAPs,
  profTrends,
  StatTrend,
} from "./types";

export type StrikeInfo = {
  runes: DieTrend;
  cClass: string;
  activity: string;
  cantrip: string;
  attackScore: StatTrend;
  damageScore: StatTrend;
  cantripScore: StatTrend;
  dieSize: number;
  numStrikes: number;
  traits: {
    [k: string]: boolean;
  };
  deadlySize: number;
  fatalSize: number;
  critSpec: boolean;
  critSpecLevel: number;
  critSpecType: string;
};

export const activityTypes = {
  Strike: "Strike",
  Skill: "Skill Action",
  Cantrip: "Cantrip",
  Spell: "Spell",
} as const;
// const activityOptions: JSX.Element[] = [];
// let actType: keyof typeof activityTypes;
// for (actType in activityTypes) {
//   activityOptions.push(
//     <MenuItem key={actType} value={activityTypes[actType]}>
//       {activityTypes[actType]}
//     </MenuItem>
//   );
// }
// export const classes = {
//   Alchemist: "Alchemist",
//   Barbarian: "Barbarian",
//   Bard: "Bard",
//   Champion: "Champion",
//   Cleric: "Cleric",
//   Druid: "Druid",
//   Fighter: "Fighter",
//   Gunslinger: "Gunslinger",
//   Inventor: "Inventor",
//   Investigator: "Investigator",
//   Magus: "Magus",
//   Monk: "Monk",
//   Oracle: "Oracle",
//   Ranger: "Ranger",
//   Rogue: "Rogue",
//   Sorcerer: "Sorcerer",
//   Summoner: "Summoner",
//   Swashbuckler: "Swashbuckler",
//   Witch: "Witch",
//   Wizard: "Wizard",
// } as const;
export const runeTrends = [dieTrends.NONE, dieTrends.RUNE, dieTrends.RUNE2];
export const classes = [
  "Alchemist",
  "Barbarian",
  "Bard",
  "Champion",
  "Cleric (Cloistered)",
  "Cleric (Warpriest)",
  "Druid",
  "Fighter",
  "Gunslinger",
  "Inventor",
  "Investigator",
  "Magus",
  "Monk",
  "Oracle",
  "Ranger (Flurry)",
  "Ranger (Precision)",
  "Rogue",
  "Sorcerer",
  "Summoner",
  "Swashbuckler",
  "Witch",
  "Wizard",
] as const;

// const classOptions: JSX.Element[] = [];
// let cls: keyof typeof classes;
// for (cls in classes) {
//   classOptions.push(
//     <MenuItem key={cls} value={classes[cls]}>
//       {classes[cls]}
//     </MenuItem>
//   );
// }
// const AlchemistStrikeOptions = ["Strike"] as const;
// const FighterStrikeOptions = ["Strike", "Power Attack"] as const;

export const cantrips = ["Telekinetic Projectile"] as const;

export const classActivities = ["Strike", "Power Attack"] as const;
// Alchemist: AlchemistStrikeOptions,
// Barbarian: AlchemistStrikeOptions,
// Bard: AlchemistStrikeOptions,
// Champion: AlchemistStrikeOptions,
// Cleric: AlchemistStrikeOptions,
// Druid: AlchemistStrikeOptions,
// Fighter: FighterStrikeOptions,
// Gunslinger: AlchemistStrikeOptions,
// Inventor: AlchemistStrikeOptions,
// Investigator: AlchemistStrikeOptions,
// Magus: AlchemistStrikeOptions,
// Monk: AlchemistStrikeOptions,
// Oracle: AlchemistStrikeOptions,
// Ranger: AlchemistStrikeOptions,
// Rogue: AlchemistStrikeOptions,
// Sorcerer: AlchemistStrikeOptions,
// Summoner: AlchemistStrikeOptions,
// Swashbuckler: AlchemistStrikeOptions,
// Witch: AlchemistStrikeOptions,
// Wizard: AlchemistStrikeOptions,
// } as const;

export const weaponTraits = [
  "agile",
  "deadly",
  "fatal",
  "forceful",
  "ranged",
  "propulsive",
] as const;

export const critSpecs = [
  "Sword",
  "Hammer",
  "Spear",
  "Other",
  "Pick",
  "Knife",
] as const;

export const classWeaponProf = (className: string) => {
  if (["Fighter", "Gunslinger"].includes(className))
    return profTrends.FIGHTERWEAPON;
  if (
    [
      "Bard",
      "Cleric (Cloistered)",
      "Druid",
      "Oracle",
      "Sorcerer",
      "Summoner",
      "Witch",
      "Wizard",
    ].includes(className)
  )
    return profTrends.CASTERWEAPON;
  if (["Alchemist", "Cleric (Warpriest)"].includes(className))
    return profTrends.ALCHWEAPON;

  return profTrends.MARTIALWEAPON;
};

export const classWeaponMAP = (strikeInfo: StrikeInfo) => {
  if (["Ranger (Flurry)"].includes(strikeInfo.cClass)) {
    if (strikeInfo.traits["agile"]) return MAPs.RA1;
    else return MAPs.R1;
  } else {
    if (strikeInfo.traits["agile"]) return MAPs.A1;
    else return MAPs.N1;
  }
};

export const classAdjustments = (
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  const adjustments: { [key: number]: number } = {};
  let currentValue = 0;
  for (let i = 1; i <= 20; i++) {
    if (strikeInfo.cClass === "Ranger (Flurry)" && i === 17)
      currentValue = Math.min(strikeNumber, 2);
    adjustments[i] = currentValue;
  }
  return adjustments;
};

export const activityWeaponDiceAdjustments = (strikeInfo: StrikeInfo) => {
  const adjustments: { [key: number]: number } = {};
  let currentValue = 0;
  for (let i = 1; i <= 20; i++) {
    if (strikeInfo.activity === "Power Attack" && i === 1) currentValue = 1;
    if (strikeInfo.activity === "Power Attack" && i === 10) currentValue = 2;
    if (strikeInfo.activity === "Power Attack" && i === 18) currentValue = 3;
    adjustments[i] = currentValue;
  }
  return adjustments;
};

export const classWeaponDamageTrends = (
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  const trends: DamageTrend[] = [];

  if (!strikeInfo.traits["propulsive"] && !strikeInfo.traits["ranged"]) {
    trends.push(strikeInfo.damageScore);
  }

  if (["Fighter", "Gunslinger"].includes(strikeInfo.cClass)) {
    trends.push(damageTrends.FIGHTERWEAPONSPEC);
  } else if (
    [
      "Bard",
      "Cleric (Cloistered)",
      "Druid",
      "Oracle",
      "Sorcerer",
      "Summoner",
      "Witch",
      "Wizard",
    ].includes(strikeInfo.cClass)
  ) {
    trends.push(damageTrends.CASTERWEAPONSPEC);
  } else if (["Alchemist", "Cleric (Warpriest)"].includes(strikeInfo.cClass)) {
    trends.push(damageTrends.CASTERWEAPONSPEC);
  } else {
    trends.push(damageTrends.MARTIALWEAPONSPEC);
  }

  if (strikeInfo.traits["forceful"]) {
    if (strikeNumber === 1) {
      trends.push(damageTrends.WEAPON);
    } else if (strikeNumber >= 2) {
      trends.push(damageTrends.WEAPON);
      trends.push(damageTrends.WEAPON);
    }
  }

  return trends;
};

export const classDamageAdjustments = (strikeInfo: StrikeInfo) => {
  const adjustments: { [key: number]: number } = {};
  let currentValue = 0;
  for (let i = 1; i <= 20; i++) {
    currentValue = 0;
    if (strikeInfo.traits["propulsive"]) {
      currentValue += Math.floor(
        statTrendValues[strikeInfo.damageScore][i] / 2
      );
    }
    if (strikeInfo.cClass === "Gunslinger") currentValue += 1;
    adjustments[i] = currentValue;
  }
  return adjustments;
};

export const hasDeadly = (strikeInfo: StrikeInfo) => {
  return strikeInfo.traits["deadly"];
};
export const hasFatal = (strikeInfo: StrikeInfo) => {
  return strikeInfo.traits["fatal"];
};
export const hasPickCritSpec = (strikeInfo: StrikeInfo) => {
  return strikeInfo.critSpec && strikeInfo.critSpecType === "Pick";
};
export const hasKnifeCritSpec = (strikeInfo: StrikeInfo) => {
  return strikeInfo.critSpec && strikeInfo.critSpecType === "Knife";
};
export const hasCritSpecEffect = (strikeInfo: StrikeInfo) => {
  return (
    hasSwordCritSpec(strikeInfo) ||
    hasHammerCritSpec(strikeInfo) ||
    hasSpearCritSpec(strikeInfo)
  );
};
export const hasSwordCritSpec = (strikeInfo: StrikeInfo) => {
  return strikeInfo.critSpec && strikeInfo.critSpecType === "Sword";
};
export const hasHammerCritSpec = (strikeInfo: StrikeInfo) => {
  return strikeInfo.critSpec && strikeInfo.critSpecType === "Hammer";
};
export const hasSpearCritSpec = (strikeInfo: StrikeInfo) => {
  return strikeInfo.critSpec && strikeInfo.critSpecType === "Hammer";
};
export const critSpecDice = (strikeInfo: StrikeInfo) => {
  const adjustments: { [key: number]: number } = {};
  let currentValue = 0;
  for (let i = 1; i <= 20; i++) {
    if (i >= strikeInfo.critSpecLevel) {
      if (strikeInfo.critSpec && strikeInfo.critSpecType === "Knife") {
        if (i >= 1) currentValue = 1;
      }
    }
    adjustments[i] = currentValue;
  }
  return adjustments;
};
export const critSpecDamage = (strikeInfo: StrikeInfo) => {
  const adjustments: { [key: number]: number } = {};
  let currentValue = 0;
  for (let i = 1; i <= 20; i++) {
    if (i >= strikeInfo.critSpecLevel) {
      if (strikeInfo.critSpec && strikeInfo.critSpecType === "Pick") {
        if (i >= 1) currentValue = 2;
        if (i >= 4) currentValue = 4;
        if (i >= 12) currentValue = 6;
        if (i >= 19) currentValue = 8;
      }
      if (strikeInfo.critSpec && strikeInfo.critSpecType === "Knife") {
        if (i >= 2) currentValue = 1;
        if (i >= 10) currentValue = 2;
        if (i >= 16) currentValue = 3;
      }
    }
    adjustments[i] = currentValue;
  }
  return adjustments;
};
