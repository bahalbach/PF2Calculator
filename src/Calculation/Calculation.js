import {
  bonusTrendValues,
  damageTrendValues,
  defaultACs,
  defaultSaves,
  dieTrendValues,
} from "../defaults";
import {
  activityTypes,
  dCond,
  defenses,
  MAPvalues,
  materials,
  rollTypes,
} from "../types";
import { applyMin, convolve, multiplyDist } from "./Distribution";

function getCritSuccessPercent(bonus, DC, keen = false) {
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

function getSuccessPercent(bonus, DC, keen = false) {
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

function getFailurePercent(bonus, DC, keen = false) {
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

function getCritFailurePercent(bonus, DC, keen = false) {
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

const addDamage = (
  context,
  type,
  material,
  persistent,
  staticDamage,
  damageDist,
  multiplier
) => {
  if (persistent) {
    context = context.persistent;
  } else {
    context = context.normal;
  }
  [staticDamage, damageDist] = multiplyDist(
    staticDamage,
    damageDist,
    multiplier
  );
  if (!(type in context)) {
    context[type] = { material, staticDamage, damageDist };
  } else {
    context[type].staticDamage += staticDamage;
    context[type].damageDist = convolve(context[type].damageDist, damageDist);
    if (material !== materials.NONE) context[type].material = material;
  }
};

function calculateExpectedDamage(
  level,
  activity,
  damages,
  target,
  targetState,
  weaknesses,
  defenseBonus,
  resistanceBonus
) {
  let bonus;
  let DC;
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

    default:
      targetValue = defaultACs[target.ACTrend];
      break;
  }
  // console.log(`here ${level} ${target.levelDiff}, ${level + target.levelDiff}`);
  targetValue = targetValue[level + target.levelDiff];
  switch (activity.type) {
    case activityTypes.STRIKE:
      bonus = bonusTrendValues[activity.bonusTrend][level];
      bonus += activity.bonusAdjustments[level];
      bonus += MAPvalues[activity.MAP];
      DC = targetValue + defenseBonus - targetState.frightened;
      if (activity.targetType === defenses.AC) {
        if (target.flatfooted || targetState.flatfooted) DC -= 2;
      } else {
        DC += 10;
      }
      break;

    case activityTypes.SAVE:
      bonus = targetValue + defenseBonus - targetState.frightened;
      DC = 10 + bonusTrendValues[activity.bonusTrend][level];
      DC += activity.bonusAdjustments[level];
      if (activity.targetType === defenses.AC) {
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
  const critDamages = { normal: {}, persistent: {} };
  const succDamages = { normal: {}, persistent: {} };
  const failDamages = { normal: {}, persistent: {} };
  const crfaDamages = { normal: {}, persistent: {} };
  const damageTrees = [critDamages, succDamages, failDamages, crfaDamages];

  // go through each damage and evaluate it, put damage types together
  damages.forEach((damage) => {
    let {
      damageCondition,
      // diceNum,
      diceSize,
      // staticDamage,
      damageType,
      material,
      persistent,
      multiplier,
    } = damage;
    // if (!staticDamage) staticDamage = 0;

    let diceNum = dieTrendValues[damage.dieTrend][level];
    // console.log(dieTrendValues[damage.dieTrend]);
    diceNum += damage.dieAdjustments[level];
    if (diceNum < 0) diceNum = 0;
    let staticDamage = damageTrendValues[damage.damageTrend][level];
    staticDamage += damage.damageAdjustments[level];
    let damageDist = [1];
    const diceArray = [];
    for (let i = 0; i < diceSize; i++) {
      diceArray.push(1 / diceSize);
    }
    for (let i = 0; i < diceNum; i++) {
      damageDist = convolve(damageDist, diceArray);
    }
    staticDamage += diceNum;

    // console.log(diceNum);
    // console.log(damage);
    // console.log(level);
    // console.log(staticDamage);

    switch (damageCondition) {
      case dCond.STRIKE:
        addDamage(
          succDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 2
        );
        break;

      case dCond.BASIC:
        addDamage(
          succDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 0.5
        );
        addDamage(
          failDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          crfaDamages,
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
          crfaDamages,
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
          failDamages,
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
          succDamages,
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
          critDamages,
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
          succDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamages,
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
          failDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          succDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamages,
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
          crfaDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          failDamages,
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
          crfaDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          failDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          succDamages,
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
          crfaDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          failDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          succDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        addDamage(
          critDamages,
          damageType,
          material,
          persistent,
          staticDamage,
          damageDist,
          multiplier * 1
        );
        break;

      default:
        console.log(
          `Damage condition ${damage.condition} not implemented yet.`
        );
    }
  });

  // for each damage group
  // console.log(damageTrees);
  for (let damageTree of damageTrees) {
    for (let damageQuality of ["normal", "persistent"]) {
      let totalStaticDamage = 0;
      let totalDamageDist = [1];
      for (let type in damageTree[damageQuality]) {
        let { material, staticDamage, damageDist } =
          damageTree[damageQuality][type];

        // ignore if there's 0 damage
        if (damageDist.length === 1 && staticDamage <= 0) continue;

        // make min damage 1 before resistances
        [staticDamage, damageDist] = applyMin(staticDamage, damageDist, 1);

        // find max weakness and resistance, weaknesses are negative numbers
        let maxW = 0;
        let maxR = 0;
        weaknesses.forEach((weakness) => {
          if (weakness.type === type || weakness.type === material) {
            if (weakness.value + resistanceBonus < 0) {
              maxW = Math.min(maxW, weakness.value + resistanceBonus);
            } else if (weakness.value + resistanceBonus > 0) {
              maxR = Math.max(maxR, weakness.value + resistanceBonus);
            }
          }
        });
        staticDamage = staticDamage - (maxR + maxW);

        // make min damage 0 after resistances
        [staticDamage, damageDist] = applyMin(staticDamage, damageDist, 0);

        // console.log([staticDamage, damageDist]);

        // damageTree[damageQuality][type].staticDamage = staticDamage;
        // damageTree[damageQuality][type].damageDist = damageDist;
        totalStaticDamage += staticDamage;
        totalDamageDist = convolve(totalDamageDist, damageDist);
      }
      damageTree[damageQuality].staticDamage = totalStaticDamage;
      damageTree[damageQuality].damageDist = totalDamageDist;
    }
  }

  return [damageTrees, chances];
}

export { calculateExpectedDamage };
