import {
  damageTrendValues,
  dieTrendValues,
  defaultACs,
  defaultSaves,
  profTrendValues,
  statTrendValues,
  itemTrendValues,
  MAPvalues,
  standardDC,
} from "../Model/defaults";
import {
  activityTypes,
  DamageType,
  dCond,
  defenses,
  Material,
  materials,
  rollTypes,
  TargetState,
  whenConditions,
} from "../Model/types";
import { ActivityPath, Damage } from "../Routines/RoutineSlice/RoutineTypes";
import { Target } from "../Target/targetSlice";
import { Weakness } from "../Target/weaknessSlice";
import { applyMin, convolve, multiplyDist } from "./Distribution";

function getCritSuccessPercent(bonus: number, DC: number, keen = false) {
  const dif = bonus - DC;
  let chance;
  if (dif < -20) {
    chance = 0;
  } else if (dif === -20) {
    chance = 5;
  } else if (dif < -9) {
    chance = keen ? 10 : 5;
  } else if (dif < 8) {
    chance = (11 + dif) * 5;
  } else {
    chance = 95;
  }

  return chance;
}

function getSuccessPercent(bonus: number, DC: number, keen = false) {
  const dif = bonus - DC;
  let chance;
  if (dif < -29) {
    chance = 0;
  } else if (dif < -20) {
    chance = 5;
  } else if (dif === -20) {
    chance = 0;
  } else if (dif < -9) {
    chance = (keen ? 19 : 20 + dif) * 5;
  } else if (dif < -1) {
    chance = 50;
  } else if (dif < 9) {
    chance = (8 - dif) * 5;
  } else {
    chance = 5;
  }

  return chance;
}

function getFailurePercent(bonus: number, DC: number, keen = false) {
  const dif = bonus - DC;
  let chance;
  if (dif < -29) {
    chance = 5;
  } else if (dif < -20) {
    chance = (29 + dif) * 5;
  } else if (dif < -10) {
    chance = 45;
  } else if (dif < -1) {
    chance = (-2 - dif) * 5;
  } else if (dif < 9) {
    chance = 5;
  } else {
    chance = 0;
  }

  return chance;
}

function getCritFailurePercent(bonus: number, DC: number, keen = false) {
  const dif = bonus - DC;
  let chance;
  if (dif < -29) {
    chance = 95;
  } else if (dif < -10) {
    chance = (-10 - dif) * 5;
  } else if (dif < -1) {
    chance = 5;
  } else {
    chance = 0;
  }

  return chance;
}

// staticDamage?: number;
// damageDist?: number[];

type PartialContext = {
  [key in DamageType]?: {
    material: Material;
    staticDamage: number;
    damageDist: number[];
  };
};
export interface DamageContext {
  staticDamage: number;
  damageDist: number[];
}
type BaseContext = {
  normal: PartialContext;
  persistent: PartialContext;
};
type FinalContext = {
  normal: DamageContext;
  persistent: DamageContext;
};
const damageQualities = { normal: "normal", persistent: "persistent" } as const;
type DamageQuality = keyof typeof damageQualities;

// combine the probability distributions of the given damages into context
const addDamage = (
  baseContext: BaseContext,
  type: DamageType,
  material: Material,
  persistent: boolean,
  staticDamage: number,
  damageDist: number[],
  multiplier: number
) => {
  let context: PartialContext;

  if (persistent) {
    context = baseContext.persistent;
  } else {
    context = baseContext.normal;
  }
  ({ staticDamage, damageDist } = multiplyDist(
    staticDamage,
    damageDist,
    multiplier
  ));
  if (!(type in context)) {
    context[type] = { material, staticDamage, damageDist };
  } else {
    context[type]!.staticDamage += staticDamage;
    context[type]!.damageDist = convolve(context[type]!.damageDist, damageDist);
    if (material !== materials.NONE) context[type]!.material = material;
  }
};

/**
 * Calculate the chance of each result and the appropriate damage
 * distributions for a given activity at level vs target with targetState
 * adds defenseBonus or resistanceBonus to target if given
 * @param {Number} level
 * @param {*} activity
 * @param {*} damages
 * @param {*} target
 * @param {*} targetState
 * @param {*} weaknesses
 * @param {*} defenseBonus
 * @param {*} resistanceBonus
 * @returns [damageTrees, chances];
 */
function calculateExpectedDamage(
  level: number,
  activity: ActivityPath,
  damages: Damage[],
  target: Target,
  targetState: TargetState,
  weaknesses: Weakness[],
  defenseBonus: number,
  resistanceBonus: number
) {
  /**
   * Get the check bonus and DC
   * Calculate the chance of each outcome
   * Go through each damage and evaluate it, put damage types together
   * Go through each damage type and apply weakness/resistance
   * Return damage trees and chances
   */
  let bonus = 0;
  let DC = 10;
  let targetValue;
  switch (activity.targetType) {
    case defenses.AC:
      targetValue = defaultACs[target.ACTrend];
      break;
    case defenses.FORT:
      targetValue = defaultSaves[target.FortTrend];
      break;
    case defenses.REF:
      targetValue = defaultSaves[target.RefTrend];
      break;
    case defenses.WILL:
      targetValue = defaultSaves[target.WillTrend];
      break;
    case defenses.PER:
      targetValue = defaultSaves[target.PerTrend];
      break;
    case defenses.DC:
      targetValue = standardDC;
      break;
    default:
      targetValue = defaultACs[target.ACTrend];
      break;
  }

  targetValue = targetValue[level + target.levelDiff];
  let targetPenalty = targetState.Frightened;
  if (
    activity.targetType === defenses.AC ||
    activity.targetType === defenses.REF
  )
    targetPenalty = Math.max(targetPenalty, targetState.Clumsy);
  switch (activity.type) {
    case activityTypes.STRIKE:
    case activityTypes.SPELLATTACK:
    case activityTypes.SKILL:
      bonus = profTrendValues[activity.profTrend][level];
      bonus += statTrendValues[activity.statTrend][level];
      bonus += itemTrendValues[activity.itemTrend][level];
      bonus += activity.bonusAdjustments[level];
      bonus += MAPvalues[activity.MAP];
      DC = targetValue + defenseBonus - targetPenalty;
      if (activity.targetType === defenses.AC) {
        if (targetState.Flatfooted) DC -= 2;
      } else {
        if (activity.targetType !== defenses.DC) DC += 10;
      }
      break;

    case activityTypes.SAVE:
      bonus = targetValue + defenseBonus - targetPenalty;
      DC = 10 + profTrendValues[activity.profTrend][level];
      DC += statTrendValues[activity.statTrend][level];
      DC += itemTrendValues[activity.itemTrend][level];
      DC += activity.bonusAdjustments[level];
      if (
        activity.targetType === defenses.AC ||
        activity.targetType === defenses.DC
      ) {
        bonus -= 10;
      }
      break;

    default:
      console.log(`Activity type ${activity.type} not implemented`);
  }

  let critPercent = getCritSuccessPercent(bonus, DC);
  let succPercent = getSuccessPercent(bonus, DC);
  let failPercent = getFailurePercent(bonus, DC);
  let crfaPercent = getCritFailurePercent(bonus, DC);
  if (activity.rollType === rollTypes.ADVANTAGE) {
    let notcrit = 100 - critPercent;
    critPercent = 100 - (notcrit * notcrit) / 100;
    let nothit = notcrit - succPercent;
    succPercent = 100 - (nothit * nothit) / 100 - critPercent;
    let notfail = nothit - failPercent;
    failPercent = 100 - (notfail * notfail) / 100 - succPercent - critPercent;
    crfaPercent = (crfaPercent * crfaPercent) / 100;
  } else if (activity.rollType === rollTypes.DISADVANTAGE) {
    let notcrfa = 100 - crfaPercent;
    crfaPercent = 100 - (notcrfa * notcrfa) / 100;
    let notfail = notcrfa - failPercent;
    failPercent = 100 - (notfail * notfail) / 100 - crfaPercent;
    let notsucc = notfail - succPercent;
    succPercent = 100 - (notsucc * notsucc) / 100 - failPercent - crfaPercent;
    critPercent = (critPercent * critPercent) / 100;
  }
  const chances = [
    critPercent / 100,
    succPercent / 100,
    failPercent / 100,
    crfaPercent / 100,
  ];
  const critDamagesByType: BaseContext = {
    normal: {},
    persistent: {},
  };
  const succDamagesByType: BaseContext = {
    normal: {},
    persistent: {},
  };
  const failDamagesByType: BaseContext = {
    normal: {},
    persistent: {},
  };
  const crfaDamagesByType: BaseContext = {
    normal: {},
    persistent: {},
  };
  const critDamages: FinalContext = {
    normal: { staticDamage: 0, damageDist: [1] },
    persistent: { staticDamage: 0, damageDist: [1] },
  };
  const succDamages: FinalContext = {
    normal: { staticDamage: 0, damageDist: [1] },
    persistent: { staticDamage: 0, damageDist: [1] },
  };
  const failDamages: FinalContext = {
    normal: { staticDamage: 0, damageDist: [1] },
    persistent: { staticDamage: 0, damageDist: [1] },
  };
  const crfaDamages: FinalContext = {
    normal: { staticDamage: 0, damageDist: [1] },
    persistent: { staticDamage: 0, damageDist: [1] },
  };
  // can't have dist here, need just damage types...
  // need to make new objects for dists... TODO
  const damageTreesByType: BaseContext[] = [
    critDamagesByType,
    succDamagesByType,
    failDamagesByType,
    crfaDamagesByType,
  ];
  const damageTrees: FinalContext[] = [
    critDamages,
    succDamages,
    failDamages,
    crfaDamages,
  ];

  // Start going through each damage and evaluate it, put damage types together
  damages.forEach((damage) => {
    let {
      damageCondition,
      diceSize,
      fatal,
      fatalDie,

      damageTrend,
      damageType,
      material,
      persistent,
      multiplier,
      damageWhen,
    } = damage;
    let shouldAddThisDamage = false;
    for (let state of damageWhen) {
      if (state === whenConditions.Always) {
        shouldAddThisDamage = true;
        break;
      }
      let val = targetState[state];
      if (val && val > 0) {
        shouldAddThisDamage = true;
        break;
      }
    }
    // if (typeof val === "boolean") {
    //   if (val) {
    //     shouldAddThisDamage = true;
    //     break;
    //   }
    // } else {
    //   if (val > 0) {
    //     shouldAddThisDamage = true;
    //     break;
    //   }
    // }

    if (!shouldAddThisDamage) return;

    let diceNum = dieTrendValues[damage.dieTrend][level];
    diceNum += damage.dieAdjustments[level];
    if (diceNum < 0) diceNum = 0;
    let staticDamage = 0;
    for (let i = 0; i < damageTrend.length; i++) {
      staticDamage += damageTrendValues[damageTrend[i]][level];
    }
    staticDamage += damage.damageAdjustments[level];
    let damageDist = [1];
    let fatalDist = [1];
    let diceArray = [];
    for (let i = 0; i < diceSize; i++) {
      diceArray.push(1 / diceSize);
    }
    for (let i = 0; i < diceNum; i++) {
      damageDist = convolve(damageDist, diceArray);
    }
    if (fatal) {
      let diceArray = [];
      for (let i = 0; i < fatalDie; i++) {
        diceArray.push(1 / fatalDie);
      }
      for (let i = 0; i < diceNum; i++) {
        fatalDist = convolve(fatalDist, diceArray);
      }
    }
    staticDamage += diceNum;

    // Add damage to damage trees appropriately
    switch (damageCondition) {
      case dCond.STRIKE:
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          fatal ? fatalDist : damageDist,
          multiplier * 2
        );
        break;

      case dCond.BASIC:
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 0.5
        );
        addDamage(
          failDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          crfaDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 2
        );
        break;

      case dCond.CRIF:
        addDamage(
          crfaDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.FAIL:
        addDamage(
          failDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.SUCC:
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.CRIT:
        addDamage(
          critDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.AT_LEAST_SUCC:
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.AT_LEAST_FAIL:
        addDamage(
          failDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.FAIL_WORSE:
        addDamage(
          crfaDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          failDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      case dCond.SUCC_WORSE:
        addDamage(
          crfaDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          failDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );

        break;

      case dCond.ALWAYS:
        addDamage(
          crfaDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          failDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          succDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamagesByType,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      default:
        console.log(`Damage condition ${damageCondition} not implemented yet.`);
    }
  });
  // end going through each damage and evaluate it, put damage types together

  // Start going through each damage type and apply weakness/resistance
  for (let damageTreeIndex = 0; damageTreeIndex < 4; damageTreeIndex++) {
    let damageTree = damageTreesByType[damageTreeIndex];
    let finalTree = damageTrees[damageTreeIndex];
    let damageQuality: DamageQuality;
    for (damageQuality in damageQualities) {
      let totalStaticDamage = 0;
      let totalDamageDist = [1];
      let type: DamageType;
      for (type in damageTree[damageQuality]) {
        let { material, staticDamage, damageDist } =
          damageTree[damageQuality][type]!;

        // ignore if there's 0 damage
        if (damageDist.length === 1 && staticDamage <= 0) continue;

        // make min damage 1 before resistances
        ({ staticDamage, damageDist } = applyMin(staticDamage, damageDist, 1));

        // find max weakness and resistance, weaknesses are negative numbers
        let maxW = 0;
        let maxR = 0;
        for (let weakness of weaknesses) {
          if (weakness.type === type || weakness.type === material) {
            if (weakness.value + resistanceBonus < 0) {
              maxW = Math.min(maxW, weakness.value + resistanceBonus);
            } else if (weakness.value + resistanceBonus > 0) {
              maxR = Math.max(maxR, weakness.value + resistanceBonus);
            }
          }
        }
        staticDamage = staticDamage - (maxR + maxW);

        // make min damage 0 after resistances
        ({ staticDamage, damageDist } = applyMin(staticDamage, damageDist, 0));

        totalStaticDamage += staticDamage;
        totalDamageDist = convolve(totalDamageDist, damageDist);
      }
      finalTree[damageQuality].staticDamage = totalStaticDamage;
      finalTree[damageQuality].damageDist = totalDamageDist;
    }
    // Add persistent damage to normal damage with a multiplier
    let { staticDamage, damageDist } = multiplyDist(
      finalTree["persistent"].staticDamage,
      finalTree["persistent"].damageDist,
      target.persistentMultiplier
    );
    finalTree["normal"].staticDamage += staticDamage;
    finalTree["normal"].damageDist = convolve(
      finalTree["normal"].damageDist,
      damageDist
    );
  }
  // End going through each damage type and apply weakness/resistance

  return { damageTrees, chances };
}

export { calculateExpectedDamage };
