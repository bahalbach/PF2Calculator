import { describe, expect, test } from "vitest";

import { calculateExpectedDamage } from "../src/Calculation/Calculation";
import { Target } from "../src/Display/targetSlice";
import {
  activityTypes,
  ACTrends,
  conditions,
  damageTrends,
  damageTypes,
  dCond,
  defenses,
  dieTrends,
  HPTrends,
  itemTrends,
  MAPs,
  materials,
  profTrends,
  rollTypes,
  SaveTrends,
  statTrends,
  TargetState,
  whenConditions,
} from "../src/Model/types";
import {
  ActivityPath,
  Adjustment,
  Damage,
} from "../src/Routines/RoutineSlice/RoutineTypes";

import { expectedValue, expectToBeCloseToArray } from "./test-utils";

// TODO:
// need to test:
// clumsy, frightend alone and stacking
// flatfooted from target and target state
// basic saves and crit/ failure damage
// damageWhen
// persistent damage

const zero: Adjustment = {};
for (let i = 1; i <= 20; i++) {
  zero[i] = 0;
}

let noDamageActivity: ActivityPath = {
  id: 1,
  name: "",
  condition: conditions.ALWAYS,
  rollType: rollTypes.NORMAL,
  type: activityTypes.STRIKE,
  profTrend: profTrends.FIGHTERWEAPON,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.WEAPON,
  bonusAdjustments: zero,
  MAP: MAPs.N1,
  targetType: defenses.AC,
  damages: [],
  effects: [],
  apIds: [],
};
let fighterStrikeWithMAP: ActivityPath = {
  id: 1,
  name: "",
  condition: conditions.ALWAYS,
  rollType: rollTypes.NORMAL,
  type: activityTypes.STRIKE,
  profTrend: profTrends.FIGHTERWEAPON,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.WEAPON,
  bonusAdjustments: zero,
  MAP: MAPs.N2,
  targetType: defenses.AC,
  damages: [1, 2],
  effects: [],
  apIds: [],
};
let damages: Damage[] = [];
damages.push({
  id: 1,
  damageCondition: dCond.STRIKE,
  dieTrend: dieTrends.WEAPON,
  dieAdjustments: zero,
  diceSize: 8,
  fatal: false,
  fatalDie: 8,
  damageTrend: [damageTrends.AS18a, damageTrends.FIGHTERWEAPONSPEC],
  damageAdjustments: zero,
  damageType: damageTypes.B,
  persistent: false,
  material: materials.NONE,
  damageWhen: [whenConditions.Always],
  multiplier: 1,
});
damages.push({
  id: 1,
  damageCondition: dCond.STRIKE,
  dieTrend: dieTrends.RUNE2,
  dieAdjustments: zero,
  diceSize: 6,
  fatal: false,
  fatalDie: 8,
  damageTrend: [],
  damageAdjustments: zero,
  damageType: damageTypes.FIRE,
  persistent: false,
  material: materials.NONE,
  damageWhen: [whenConditions.Always],
  multiplier: 1,
});
let target: Target = {
  id: 1,
  name: "",
  levelDiff: 0,
  persistentMultiplier: 0,
  ACTrend: ACTrends.MODERATE,
  FortTrend: SaveTrends.MODERATE,
  RefTrend: SaveTrends.MODERATE,
  WillTrend: SaveTrends.MODERATE,
  PerTrend: SaveTrends.MODERATE,
  HPTrend: HPTrends.MODERATE,
  percentHP: 100,
  flatfooted: false,
  percentSelectedRoutine: false,
  weaknesses: [],
  graphType: "Damage Distribution",
  routineLevel: 0,
  targetLevel: 0,
  overrideAC: 0,
  overrideFort: 0,
  overrideRef: 0,
  overrideWill: 0,
  overridePer: 0,
  overrideHP: 0,
  currentHP: 0,
};
let targetState: TargetState = {
  Flatfooted: false,
  Restrained: false,
  Grappled: false,
  Frightened: 0,
  Clumsy: 0,
  Prone: false,
  "Cicumstance Bonus to next attack": 0,
  "Status Bonus to all attacks": 0,
  persistentDamages: {},
};

describe("Calculation", () => {
  test("calculateExpectedDamage with no damage", () => {
    let { damageTrees, chances } = calculateExpectedDamage(
      noDamageActivity,
      [],
      target,
      targetState,
      [],
      0,
      0,
      true,
      1
    );
    expect(damageTrees.length).toBe(4);
    for (let i = 0; i < 4; i++) {
      expect(damageTrees[i].normal.staticDamage).toBe(0);
      expectToBeCloseToArray(damageTrees[i].normal.damageDist, [1]);
    }
    expect(chances[0]).toBeCloseTo(0.25); // crit chance
    expect(chances[1]).toBeCloseTo(0.5); // hit chance
    expect(chances[2]).toBeCloseTo(0.2); // fail chance
    expect(chances[3]).toBeCloseTo(0.05); // crit fail chance
  });

  test("calculateExpectedDamage with strike damage at 1", () => {
    let { damageTrees, chances } = calculateExpectedDamage(
      fighterStrikeWithMAP,
      damages,
      target,
      targetState,
      [],
      0,
      0,
      true,
      1
    );
    expect(damageTrees.length).toBe(4);
    expect(damageTrees[0].normal.staticDamage).toBe(10);
    expect(expectedValue(damageTrees[0].normal.damageDist)).toBeCloseTo(7);
    // max health not applied
    expect(damageTrees[1].normal.staticDamage).toBe(5);
    expect(expectedValue(damageTrees[1].normal.damageDist)).toBeCloseTo(3.5);
    expect(damageTrees[2].normal.staticDamage).toBe(0);
    expectToBeCloseToArray(damageTrees[2].normal.damageDist, [1]);
    expect(damageTrees[3].normal.staticDamage).toBe(0);
    expectToBeCloseToArray(damageTrees[3].normal.damageDist, [1]);

    expect(chances[0]).toBeCloseTo(0.05); // crit chance
    expect(chances[1]).toBeCloseTo(0.45); // hit chance
    expect(chances[2]).toBeCloseTo(0.45); // fail chance
    expect(chances[3]).toBeCloseTo(0.05); // crit fail chance
  });

  test("calculateExpectedDamage with strike damage at 20", () => {
    let { damageTrees, chances } = calculateExpectedDamage(
      fighterStrikeWithMAP,
      damages,
      target,
      targetState,
      [],
      0,
      0,
      true,
      20
    );
    expect(damageTrees.length).toBe(4);
    expect(damageTrees[0].normal.staticDamage).toBe(44);
    expect(expectedValue(damageTrees[0].normal.damageDist)).toBeCloseTo(43);
    expect(damageTrees[1].normal.staticDamage).toBe(22);
    expect(expectedValue(damageTrees[1].normal.damageDist)).toBeCloseTo(21.5);
    expect(damageTrees[2].normal.staticDamage).toBe(0);
    expectToBeCloseToArray(damageTrees[2].normal.damageDist, [1]);
    expect(damageTrees[3].normal.staticDamage).toBe(0);
    expectToBeCloseToArray(damageTrees[3].normal.damageDist, [1]);

    expect(chances[0]).toBeCloseTo(0.05); // crit chance
    expect(chances[1]).toBeCloseTo(0.45); // hit chance
    expect(chances[2]).toBeCloseTo(0.45); // fail chance
    expect(chances[3]).toBeCloseTo(0.05); // crit fail chance
  });
});
