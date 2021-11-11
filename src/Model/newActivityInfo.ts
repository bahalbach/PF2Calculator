import { statTrendValues, valuesFromBonusLevels } from "./defaults";
import {
  conditions,
  DamageTrend,
  damageTrends,
  damageTypes,
  dCond,
  defenses,
  diceSizes,
  DieTrend,
  dieTrends,
  effectTypes,
  ItemTrend,
  MAPs,
  ProfTrend,
  profTrends,
  StatTrend,
  whenConditions,
} from "./types";

export type StrikeInfo = {
  runes: DieTrend;
  cClass: string;
  classOption: string;
  activity: string;
  cantrip: string;
  attackScore: StatTrend;
  damageScore: StatTrend;
  cantripScore: StatTrend;
  dieSize: number;
  numPrevStrikes: number;
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
export type SkillInfo = {
  proficiency: ProfTrend;
  abilityScore: StatTrend;
  itemBonus: ItemTrend;
  skillActivity: typeof skillActivities[number];
};
export type CantripInfo = {
  proficiency: ProfTrend;
  abilityScore: StatTrend;
  cantrip: typeof cantrips[number];
};
export type SpellInfo = {
  proficiency: ProfTrend;
  abilityScore: StatTrend;
  spell: typeof spells[number];
};

export const activityTypes = {
  Strike: "Strike",
  Skill: "Skill Action",
  Cantrip: "Cantrip",
  Spell: "Spell",
} as const;

export const runeTrends = [dieTrends.NONE, dieTrends.RUNE, dieTrends.RUNE2];

export const classes = [
  "Alchemist",
  "Barbarian",
  "Bard",
  "Champion",
  "Cleric",
  "Druid",
  "Fighter",
  "Gunslinger",
  "Inventor",
  "Investigator",
  "Magus",
  "Monk",
  "Oracle",
  "Ranger",
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
const noOptions = [] as const;
const barbarianOptions = [
  "Normal",
  "animal rage",
  "dragon rage",
  "rage",
  "giant rage",
  "spirit rage",
] as const;
const clericOptions = ["Cloistered", "Warpriest"] as const;
const rangerOptions = ["Normal", "Flurry Edge"] as const;
const inventorOptions = [
  "Normal",
  "Overdrive Success",
  "Overdrive Critical",
] as const;
const investigatorOptions = ["Normal", "Strategic Strike"] as const;
const rogueOptions = ["Normal", "Sneak Attack"] as const;
const swashbucklerOptions = [
  "Normal",
  "Precise Strike",
  "Precise Finisher",
] as const;
const magusOptions = ["Normal", "Arcane Cascade"] as const;

export const strikeActivities = [
  "Strike",
  "Power Attack",
  "Ki Strike",
] as const;
type ClassOptions = { [key in typeof classes[number]]: readonly string[] };
export const classOptions: ClassOptions = {
  Alchemist: noOptions,
  Barbarian: barbarianOptions,
  Bard: noOptions,
  Champion: noOptions,
  Cleric: clericOptions,
  Druid: noOptions,
  Fighter: noOptions,
  Gunslinger: noOptions,
  Inventor: inventorOptions,
  Investigator: investigatorOptions,
  Magus: magusOptions,
  Monk: noOptions,
  Oracle: noOptions,
  Ranger: rangerOptions,
  Rogue: rogueOptions,
  Sorcerer: noOptions,
  Summoner: noOptions,
  Swashbuckler: swashbucklerOptions,
  Witch: noOptions,
  Wizard: noOptions,
} as const;

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

export const skillProfTrends = [profTrends.TRAINED, profTrends.MAXSKILL];
export const spellProfTrends = [
  profTrends.TRAINED,
  profTrends.CASTERSPELL,
  profTrends.MCSPELL,
  profTrends.CLASSDC1,
  profTrends.CLASSDC2,
];

export const skillActivities = ["Trip", "Grapple", "Demoralize"] as const;
export const cantrips = [
  "Electric Arc",
  "Daze",
  "Gouging Claw",
  "Produce Flame",
  "Ray of Frost",
  "Telekinetic Projectile",
] as const;
export const spells = ["Fear", "Fireball"] as const;

export const classWeaponProf = (className: string, classOption: string) => {
  if (["Fighter", "Gunslinger"].includes(className))
    return profTrends.FIGHTERWEAPON;
  if (
    [
      "Bard",
      "Druid",
      "Oracle",
      "Sorcerer",
      "Summoner",
      "Witch",
      "Wizard",
    ].includes(className)
  )
    return profTrends.CASTERWEAPON;
  if (["Alchemist"].includes(className)) return profTrends.ALCHWEAPON;
  if (className === "Cleric") {
    if (classOption === "Warpriest") return profTrends.ALCHWEAPON;
    return profTrends.CASTERWEAPON;
  }
  return profTrends.MARTIALWEAPON;
};

export const classWeaponMAP = (strikeInfo: StrikeInfo) => {
  if (
    strikeInfo.cClass === "Ranger" &&
    strikeInfo.classOption === "Flurry Edge"
  ) {
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
    currentValue = 0;

    if (strikeInfo.cClass === "Ranger (Flurry)" && i >= 17)
      currentValue += Math.min(strikeNumber, 2);

    if (strikeInfo.activity === "Ki Strike") currentValue += 1;

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

export const hasClassDamageDice = (strikeInfo: StrikeInfo) => {
  if (
    strikeInfo.cClass === "Rogue" &&
    strikeInfo.classOption === "Sneak Attack"
  ) {
    return true;
  }
  if (
    strikeInfo.cClass === "Investigator" &&
    strikeInfo.classOption === "Strategic Strike"
  ) {
    return true;
  }
  if (
    strikeInfo.cClass === "Swashbuckler" &&
    strikeInfo.classOption === "Precise Finisher"
  ) {
    return true;
  }
  return false;
};

export const classDamageDice = (strikeInfo: StrikeInfo) => {
  if (
    strikeInfo.cClass === "Rogue" &&
    strikeInfo.classOption === "Sneak Attack"
  ) {
    return {
      dieTrend: dieTrends.SNEAK,
      diceSize: diceSizes[6],
      damageType: damageTypes.PRECISION,
      damageWhen: [whenConditions.FLATFOOT],
    };
  }
  if (
    strikeInfo.cClass === "Investigator" &&
    strikeInfo.classOption === "Strategic Strike"
  ) {
    return {
      dieTrend: dieTrends.STRATEGIC,
      diceSize: diceSizes[6],
      damageType: damageTypes.PRECISION,
      damageWhen: [whenConditions.Always],
    };
  }
  if (
    strikeInfo.cClass === "Swashbuckler" &&
    strikeInfo.classOption === "Precise Finisher"
  ) {
    return {
      dieTrend: dieTrends.PRECISE,
      diceSize: diceSizes[6],
      damageType: damageTypes.PRECISION,
      damageWhen: [whenConditions.Always],
    };
  }
  return {
    dieTrend: dieTrends.NONE,
    diceSize: diceSizes[6],
    damageType: damageTypes.PRECISION,
    damageWhen: [whenConditions.Always],
  };
};

export const hasActivityDamageDice = (strikeInfo: StrikeInfo) => {
  if (strikeInfo.activity === "Ki Strike") {
    return true;
  }
  return false;
};

export const activityDamageDice = (strikeInfo: StrikeInfo) => {
  if (strikeInfo.activity === "Ki Strike") {
    return {
      dieTrend: dieTrends.KISTRIKE,
      diceSize: diceSizes[6],
      damageType: damageTypes.FORCE,
    };
  }
  return {
    dieTrend: dieTrends.NONE,
    diceSize: diceSizes[6],
    damageType: damageTypes.NONE,
  };
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
      "Cleric",
      "Druid",
      "Oracle",
      "Sorcerer",
      "Summoner",
      "Witch",
      "Wizard",
    ].includes(strikeInfo.cClass)
  ) {
    trends.push(damageTrends.CASTERWEAPONSPEC);
  } else if (["Alchemist"].includes(strikeInfo.cClass)) {
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

  if (strikeInfo.cClass === "Barbarian") {
    switch (strikeInfo.classOption) {
      case "animal rage":
        trends.push(damageTrends.ANIMALRAGE);
        break;
      case "dragon rage":
        trends.push(damageTrends.DRAGONRAGE);
        break;
      case "rage":
        trends.push(damageTrends.RAGE);
        break;
      case "giant rage":
        trends.push(damageTrends.GIANTRAGE);
        break;
      case "spirit rage":
        trends.push(damageTrends.SPIRITRAGE);
        break;
      default:
    }
  }
  if (strikeInfo.cClass === "Magus") {
    switch (strikeInfo.classOption) {
      case "Arcane Cascade":
        trends.push(damageTrends.ARCANECASCADE);
        break;
      default:
    }
  }

  if (
    strikeInfo.cClass === "Swashbuckler" &&
    strikeInfo.classOption === "Precise Strike"
  ) {
    trends.push(damageTrends.PRECISE);
  }
  // if (strikeInfo.cClass === "Inventor") {
  //   switch (strikeInfo.classOption) {
  //     case "Overdrive Success":
  //       trends.push(damageTrends.OVERDRIVES);
  //       break;
  //     case "Overdrive Critical":
  //       trends.push(damageTrends.OVERDRIVEC);
  //       break;
  //     default:
  //   }
  // }

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

    if (strikeInfo.cClass === "Inventor") {
      let bonus = 0;
      if (i >= 3) bonus = 1;
      if (i >= 7) bonus = 2;
      if (i >= 15) bonus = 3;
      switch (strikeInfo.classOption) {
        case "Overdrive Success":
          currentValue +=
            Math.floor(statTrendValues[strikeInfo.cantripScore][i] / 2) + bonus;
          break;
        case "Overdrive Critical":
          currentValue += statTrendValues[strikeInfo.cantripScore][i] + bonus;
          break;
        default:
      }
    }

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

export const getSkillTarget = (skillInfo: SkillInfo) => {
  switch (skillInfo.skillActivity) {
    case "Trip":
      return defenses.REF;
    case "Grapple":
      return defenses.FORT;
    case "Demoralize":
      return defenses.WILL;
    default:
      return defenses.selfDC;
  }
};

export const getSkillEffects = (skillInfo: SkillInfo) => {
  switch (skillInfo.skillActivity) {
    case "Trip":
      return [
        {
          effectCondition: conditions.AT_LEAST_SUCC,
          effectType: effectTypes.PRONE,
          effectValue: 0,
        },
      ];
    case "Grapple":
      return [
        {
          effectCondition: conditions.SUCC,
          effectType: effectTypes.GRAPPLED,
          effectValue: 0,
        },
        {
          effectCondition: conditions.CRIT,
          effectType: effectTypes.RESTRAINED,
          effectValue: 0,
        },
      ];
    case "Demoralize":
      return [
        {
          effectCondition: conditions.SUCC,
          effectType: effectTypes.FRIGHTENED,
          effectValue: 1,
        },
        {
          effectCondition: conditions.CRIT,
          effectType: effectTypes.FRIGHTENED,
          effectValue: 2,
        },
      ];
    default:
      return [];
  }
};
export const hasSkillDamage = (skillInfo: SkillInfo) => {
  if (skillInfo.skillActivity === "Trip") {
    return true;
  }
  return false;
};

export const getCantripTarget = (cantripInfo: CantripInfo) => {
  switch (cantripInfo.cantrip) {
    case "Electric Arc":
      return { type: "Save", targetType: defenses.REF } as const;
    case "Daze":
      return { type: "Save", targetType: defenses.WILL } as const;

    default:
      return { targetType: defenses.AC };
  }
};
export const getCantripDamage = (cantripInfo: CantripInfo) => {
  switch (cantripInfo.cantrip) {
    case "Electric Arc":
      return { damageCondition: dCond.BASIC, diceSize: diceSizes[4] };
    case "Daze":
      return {
        damageCondition: dCond.BASIC,
        dieTrend: dieTrends.NONE,
        dieAdjustments: valuesFromBonusLevels([5, 9, 13, 17]),
      };
    case "Telekinetic Projectile":
      return {};
    default:
      return { diceSize: diceSizes[4] };
  }
};
export const getSpellTarget = (spellInfo: SpellInfo) => {
  switch (spellInfo.spell) {
    case "Fireball":
      return { targetType: defenses.REF };
    case "Fear":
      return { targetType: defenses.WILL };

    default:
      return { targetType: defenses.REF };
  }
};
