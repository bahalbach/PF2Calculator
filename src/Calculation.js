import { activityTypes, dCond, defenses, MAPvalues } from "./types";

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

function calculateExpectedDamage(activity, damages, target, weaknesses) {
  let bonus;
  let DC;
  switch (activity.type) {
    case activityTypes.STRIKE:
      bonus = activity.value;
      bonus += MAPvalues[activity.MAP];
      DC = target[activity.targetType];
      if (activity.targetType === defenses.AC) {
        if (target.flatfooted) DC -= 2;
      } else {
        DC += 10;
      }
      break;

    case activityTypes.SAVE:
      bonus = target[activity.targetType];
      DC = activity.value;
      if (activity.targetType === defenses.AC) {
        bonus -= 10;
      }
      break;

    default:
      console.log(`Activity type ${activity.type} not implemented`);
  }

  const critPercent = getCritSuccessPercent(bonus, DC);
  const succPercent = getSuccessPercent(bonus, DC);
  const failPercent = getFailurePercent(bonus, DC);
  const crfaPercent = getCritFailurePercent(bonus, DC);
  //   const failPercent = getFa
  // console.log(
  //   `${bonus} ${DC} ${critPercent} ${succPercent} ${failPercent} ${crfaPercent}`
  // );

  let expD = 0;
  let expP = 0;
  let multiplier;
  let aveD;
  let thisD;
  let maxW;
  let maxR;

  damages.forEach((damage) => {
    let {
      condition,
      diceNum,
      diceSize,
      staticDamage,
      type,
      material,
      persistent,
    } = damage;

    // find max weakness and resistance, weaknesses are negative numbers
    maxW = 0;
    maxR = 0;
    weaknesses.forEach((weakness) => {
      if (weakness.type === type || weakness.type === material) {
        if (weakness.value < 0) {
          maxW = Math.min(maxW, weakness.value);
        } else if (weakness.value > 0) {
          maxR = Math.max(maxR, weakness.value);
        }
      }
    });

    // TODO: max distribution and add weak/res after...
    // if there's any damage add the weakness, weakness is negative
    if (staticDamage > 0 || diceNum > 0) staticDamage -= maxW;
    staticDamage -= maxR;

    // if static damage < -diceNum things are complicated...
    if (staticDamage < -diceNum) {
      console.log("Damage not correct..., < 0 not handled");
      aveD = ((diceSize + 1) * diceNum) / 2 + staticDamage;
    } else {
      aveD = ((diceSize + 1) * diceNum) / 2 + staticDamage;
    }

    switch (condition) {
      case dCond.STRIKE:
        multiplier = succPercent + 2 * critPercent;
        break;

      case dCond.BASIC:
        multiplier = succPercent * 0.5 + failPercent + crfaPercent * 2;
        break;

      case dCond.CRIF:
        multiplier = crfaPercent;
        break;

      case dCond.FAIL:
        multiplier = failPercent;
        break;

      case dCond.SUCC:
        multiplier = succPercent;
        break;

      case dCond.CRIT:
        multiplier = critPercent;
        break;

      case dCond.AT_LEAST_SUCC:
        multiplier = succPercent + critPercent;
        break;

      case dCond.AT_LEAST_FAIL:
        multiplier = failPercent + succPercent + critPercent;
        break;

      case dCond.FAIL_WORSE:
        multiplier = failPercent + crfaPercent;
        break;

      case dCond.SUCC_WORSE:
        multiplier = succPercent + failPercent + crfaPercent;
        break;

      case dCond.ALWAYS:
        multiplier = 100;
        break;

      default:
        multiplier = 0;
        console.log(
          `Damage condition ${damage.condition} not implemented yet.`
        );
    }
    thisD = multiplier * aveD;
    if (persistent) expP += thisD;
    else expD += thisD;
    console.log(`this damage: m${multiplier} ave${aveD}`);
  });

  // divide by 100 because using percents %
  return [
    expD / 100,
    expP / 100,
    critPercent / 100,
    succPercent / 100,
    failPercent / 100,
    crfaPercent / 100,
  ];
}

export {
  //   totalBonusDescription,
  //   attackBonusDescription,
  //   totalDamageDescription,
  calculateExpectedDamage,
};
