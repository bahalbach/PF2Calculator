export const convolve = (vec1: number[], vec2: number[]) => {
  if (vec1.length === 0 || vec2.length === 0) {
    throw new Error("Vectors can not be empty!");
  }
  const volume = vec1;
  const kernel = vec2;
  let displacement = 0;
  const convVec: number[] = [];

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

export const multiplyDist = (
  dam: number,
  dist: number[],
  multiplier: number
) => {
  if (multiplier === 0) return { staticDamage: 0, damageDist: [1] };
  if (multiplier === 1) return { staticDamage: dam, damageDist: [...dist] };

  const newDist = [0];
  let index = 0;
  const newDam = Math.floor(dam * multiplier);

  let i = 0;
  let oldValue = newDam;
  for (let chance of dist) {
    let newValue = Math.floor((dam + i) * multiplier);
    if (newValue === oldValue) {
      newDist[index] += chance;
    } else {
      if (newValue > oldValue + 1) {
        for (let diff = 0; diff < newValue - (oldValue + 1); diff++) {
          index++;
          newDist[index] = 0;
        }
      }
      index++;
      newDist[index] = chance;
    }
    oldValue = newValue;
    i++;
  }

  return { staticDamage: newDam, damageDist: newDist };
};

type Dist = {
  distribution: { staticDamage: number; damageDist: number[] };
  chance: number;
};
/**
 * Combine multiple distributions with their chances into one distribution starting from 0
 * @param  {...[{staticDamage, distribution}, chance]} dists
 * @returns {[number]} new distribution
 */
export const consolidateDists = (...dists: Dist[]) => {
  let maxDamage = 0;
  for (let dist of dists) {
    maxDamage = Math.max(
      maxDamage,
      dist.distribution.staticDamage + dist.distribution.damageDist.length
    );
  }
  let damageDist = [];
  for (let i = 0; i < maxDamage; i++) {
    damageDist.push(0);
    for (let dist of dists) {
      if (dist.distribution.staticDamage <= i) {
        let index = i - dist.distribution.staticDamage;
        if (index < dist.distribution.damageDist.length)
          damageDist[i] += dist.distribution.damageDist[index] * dist.chance;
      }
    }
  }
  return damageDist;
};

/**
 * apply a minimum to a distribution, like for damage penalties or resistances
 * @param {number} staticDamage
 * @param {[number]} damageDist
 * @param {number} min
 * @returns { distribution: {staticDamage: number, damageDist: [number]}}
 */
export const applyMin = (
  staticDamage: number,
  damageDist: number[],
  min: number
) => {
  while (staticDamage < min) {
    if (damageDist.length >= 2) {
      damageDist[1] += damageDist[0];
      damageDist.shift();
    }
    staticDamage++;
  }
  return { staticDamage, damageDist };
};
