import { defaultValues } from "./types";

const extremeAC = {
  "-1": 18,
  0: 19,
  1: 19,
  2: 21,
  3: 22,
  4: 24,
  5: 25,
  6: 27,
  7: 28,
  8: 30,
  9: 31,
  10: 33,
  11: 34,
  12: 36,
  13: 37,
  14: 39,
  15: 40,
  16: 42,
  17: 43,
  18: 45,
  19: 46,
  20: 48,
  21: 49,
  22: 51,
  23: 52,
  24: 54,
};
const highAC = { ...extremeAC };
for (let level in highAC) highAC[level] -= 3;

const moderateAC = { ...extremeAC };
for (let level in moderateAC) moderateAC[level] -= 4;

const lowAC = { ...extremeAC };
for (let level in lowAC) lowAC[level] -= 6;

export const defaultACs = {
  [defaultValues.EXTREME]: extremeAC,
  [defaultValues.HIGH]: highAC,
  [defaultValues.MODERATE]: moderateAC,
  [defaultValues.LOW]: lowAC,
};
