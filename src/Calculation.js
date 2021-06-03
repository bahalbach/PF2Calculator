import { activityTypes, dCond, defenses, MAPvalues, materials } from "./types";

// const diceCombinations = (number, size) => {
//   if (number===0) return [1];

//   const factor = 1 / (size ** number);
//   const dist = [];
//   for (let i=0; i<number; i++) {
//     // (number choose i) * factor
//   }
// }

export const convolve = (vec1, vec2) => {
  if (vec1.length === 0 || vec2.length === 0) {
    throw new Error("Vectors can not be empty!");
  }
  const volume = vec1;
  const kernel = vec2;
  let displacement = 0;
  const convVec = [];

  for (let i = 0; i < volume.length; i++) {
    for (let j = 0; j < kernel.length; j++) {
      if (displacement + j !== convVec.length) {
        convVec[displacement + j] =
          convVec[displacement + j] + volume[i] * kernel[j];
      } else {
        convVec.push(volume[i] * kernel[j]);
      }
    }
    displacement++;
  }

  return convVec;
};

const multiplyDist = (dam, dist, multiplier) => {
  if (multiplier === 0) return [0, [1]];
  if (multiplier === 1) return [dam, dist];

  const newDist = [0];
  let index = 0;
  const newDam = Math.floor(dam * multiplier);

  let i = 0;
  let oldValue = newDam;
  for (let chance of dist) {
    let newValue = Math.floor((dam + i) * multiplier);
    if (newValue === oldValue) {
      // console.log(`adding ${newValue} at ${index} with ${chance}`);
      newDist[index] += chance;
    } else {
      if (newValue > oldValue + 1) {
        for (let diff = 0; diff < newValue - (oldValue + 1); diff++) {
          index++;
          // console.log(`adding ${newValue} at ${index} with ${0}`);
          newDist[index] = 0;
        }
      }
      index++;
      // console.log(`adding ${newValue} at ${index} with ${chance}`);
      newDist[index] = chance;
    }
    oldValue = newValue;
    i++;
  }

  return [newDam, newDist];
};

export const consolidateDists = (...dists) => {
  // dists = [[{staticDamage, damageDist}, chance]]...]
  // console.log(dists);
  let maxDamage = 0;
  for (let dist of dists) {
    // console.log(`chance is ${dist[1]}`);
    maxDamage = Math.max(
      maxDamage,
      dist[0].staticDamage + dist[0].damageDist.length
    );
  }
  let damageDist = [];
  for (let i = 0; i < maxDamage; i++) {
    damageDist.push(0);
    // console.log(`i is ${i}`);
    for (let dist of dists) {
      if (dist[0].staticDamage <= i) {
        let index = i - dist[0].staticDamage;
        // console.log(`val ${dist[0].damageDist[index]} at index ${index}`);
        if (index < dist[0].damageDist.length)
          damageDist[i] += dist[0].damageDist[index] * dist[1];
      }
    }
  }
  // console.log([staticDamage, damageDist]);
  return damageDist;
};

const applyMin = (staticDamage, damageDist, min) => {
  // TODO: implement applyMin
  while (staticDamage < min) {
    if (damageDist.length >= 2) {
      damageDist[1] += damageDist[0];
      damageDist.shift();
    }
    staticDamage++;
  }
  return [staticDamage, damageDist];
};

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
      condition,
      diceNum,
      diceSize,
      staticDamage,
      type,
      material,
      persistent,
    } = damage;
    if (!staticDamage) staticDamage = 0;

    let damageDist = [1];
    const diceArray = [];
    for (let i = 0; i < diceSize; i++) {
      diceArray.push(1 / diceSize);
    }
    for (let i = 0; i < diceNum; i++) {
      damageDist = convolve(damageDist, diceArray);
    }
    staticDamage += diceNum;

    switch (condition) {
      case dCond.STRIKE:
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          critDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          2
        );
        break;

      case dCond.BASIC:
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          0.5
        );
        addDamage(
          failDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          crfaDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.CRIF:
        addDamage(
          crfaDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.FAIL:
        addDamage(
          failDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.SUCC:
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.CRIT:
        addDamage(
          critDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.AT_LEAST_SUCC:
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          critDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.AT_LEAST_FAIL:
        addDamage(
          failDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          critDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.FAIL_WORSE:
        addDamage(
          crfaDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          failDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        break;

      case dCond.SUCC_WORSE:
        addDamage(
          crfaDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          failDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );

        break;

      case dCond.ALWAYS:
        addDamage(
          crfaDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          failDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          succDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
        );
        addDamage(
          critDamages,
          type,
          material,
          persistent,
          staticDamage,
          damageDist,
          1
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
        // console.log(type);
        // make min damage 1 before resistances
        [staticDamage, damageDist] = applyMin(staticDamage, damageDist, 1);

        // find max weakness and resistance, weaknesses are negative numbers
        let maxW = 0;
        let maxR = 0;
        weaknesses.forEach((weakness) => {
          if (weakness.type === type || weakness.type === material) {
            if (weakness.value < 0) {
              maxW = Math.min(maxW, weakness.value);
            } else if (weakness.value > 0) {
              maxR = Math.max(maxR, weakness.value);
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

export {
  //   totalBonusDescription,
  //   attackBonusDescription,
  //   totalDamageDescription,
  calculateExpectedDamage,
};
