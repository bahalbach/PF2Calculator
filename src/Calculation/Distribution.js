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

export const multiplyDist = (dam, dist, multiplier) => {
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

export const applyMin = (staticDamage, damageDist, min) => {
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
