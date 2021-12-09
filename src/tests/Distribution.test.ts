import {
  applyMin,
  applyMax,
  consolidateDists,
  convolve,
  multiplyDist,
} from "../Calculation/Distribution";
import { expectedValue, expectToBeCloseToArray } from "./test-utils";

const vectors = [
  { vec1: [1], vec2: [1], correctConv: [1] },
  {
    vec1: [1],
    vec2: [0.25, 0.25, 0.25, 0.25],
    correctConv: [0.25, 0.25, 0.25, 0.25],
  },
  { vec1: [0.5, 0.5], vec2: [0.5, 0.5], correctConv: [0.25, 0.5, 0.25] },
];

describe("Distribution", () => {
  test("convolve implemented correctly", () => {
    for (const { vec1, vec2, correctConv } of vectors) {
      expectToBeCloseToArray(convolve(vec1, vec2), correctConv);
    }
    expect(
      expectedValue(
        convolve([0.25, 0.25, 0.25, 0.25], [0.25, 0.25, 0.25, 0.25])
      )
    ).toBeCloseTo(3);
  });

  test("applyMin works for min damage 1", () => {
    let { staticDamage, damageDist } = applyMin(1, [0.25, 0.25, 0.25, 0.25], 1);
    expect(staticDamage).toBe(1);
    expectToBeCloseToArray(damageDist, [0.25, 0.25, 0.25, 0.25]);

    ({ staticDamage, damageDist } = applyMin(-1, [0.25, 0.25, 0.25, 0.25], 1));
    expect(staticDamage).toBe(1);
    expectToBeCloseToArray(damageDist, [0.75, 0.25]);

    ({ staticDamage, damageDist } = applyMin(-4, [0.25, 0.25, 0.25, 0.25], 1));
    expect(staticDamage).toBe(1);
    expectToBeCloseToArray(damageDist, [1]);
  });

  test("applyMin works for min damage 0", () => {
    let { staticDamage, damageDist } = applyMin(1, [0.25, 0.25, 0.25, 0.25], 0);
    expect(staticDamage).toBe(1);
    expectToBeCloseToArray(damageDist, [0.25, 0.25, 0.25, 0.25]);

    ({ staticDamage, damageDist } = applyMin(-1, [0.25, 0.25, 0.25, 0.25], 0));
    expect(staticDamage).toBe(0);
    expectToBeCloseToArray(damageDist, [0.5, 0.25, 0.25]);

    ({ staticDamage, damageDist } = applyMin(-4, [0.25, 0.25, 0.25, 0.25], 0));
    expect(staticDamage).toBe(0);
    expectToBeCloseToArray(damageDist, [1]);
  });

  test("applyMax works", () => {
    let { staticDamage, damageDist } = applyMax(1, [0.25, 0.25, 0.25, 0.25], 5);
    expect(staticDamage).toBe(1);
    expectToBeCloseToArray(damageDist, [0.25, 0.25, 0.25, 0.25]);

    ({ staticDamage, damageDist } = applyMax(3, [0.25, 0.25, 0.25, 0.25], 2));
    expect(staticDamage).toBe(2);
    expectToBeCloseToArray(damageDist, [1]);

    ({ staticDamage, damageDist } = applyMax(3, [0.25, 0.25, 0.25, 0.25], 5));
    expect(staticDamage).toBe(3);
    expectToBeCloseToArray(damageDist, [0.25, 0.25, 0.5]);
  });

  test("multiplyDist works correctly", () => {
    // stay constant with 1
    let { staticDamage, damageDist } = multiplyDist(
      -1,
      [0.25, 0.25, 0.25, 0.25],
      1
    );
    expect(staticDamage).toBe(-1);
    expectToBeCloseToArray(damageDist, [0.25, 0.25, 0.25, 0.25]);

    // double with 2
    ({ staticDamage, damageDist } = multiplyDist(
      -1,
      [0.25, 0.25, 0.25, 0.25],
      2
    ));
    expect(staticDamage).toBe(-2);
    expectToBeCloseToArray(damageDist, [0.25, 0, 0.25, 0, 0.25, 0, 0.25]);

    // halve (round down) with 0.5
    ({ staticDamage, damageDist } = multiplyDist(
      -1,
      [0.25, 0.25, 0.25, 0.25],
      0.5
    ));
    expect(staticDamage).toBe(-1);
    expectToBeCloseToArray(damageDist, [0.25, 0.5, 0.25]);
  });

  test("consolidateDists works correctly", () => {
    let dists = [
      { distribution: { staticDamage: 3, damageDist: [1] }, chance: 0.3 },
      {
        distribution: { staticDamage: 2, damageDist: [0.5, 0.5] },
        chance: 0.7,
      },
    ];
    expectToBeCloseToArray(consolidateDists(...dists), [0, 0, 0.35, 0.65]);

    dists = [
      {
        distribution: { staticDamage: 1, damageDist: [0.25, 0.25, 0.25, 0.25] },
        chance: 0.5,
      },
      {
        distribution: { staticDamage: 2, damageDist: [0.5, 0.5] },
        chance: 0.5,
      },
    ];
    expectToBeCloseToArray(
      consolidateDists(...dists),
      [0, 0.125, 0.375, 0.375, 0.125]
    );
  });
});
