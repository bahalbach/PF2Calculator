import { EntityState } from "@reduxjs/toolkit";
import {
  activityTypes,
  conditions,
  profTrends,
  defenses,
  MAPs,
  rollTypes,
  statTrends,
  itemTrends,
  effectTypes,
  damageTrends,
  Condition,
  RollType,
  ActivityType,
  ProfTrend,
  StatTrend,
  ItemTrend,
  MAP,
  Defense,
  DamageCond,
  DieTrend,
  DamageTrend,
  DamageType,
  Material,
  EffectType,
  damageTypes,
  dCond,
  dieTrends,
  materials,
  WhenConditions,
  ImportStates,
  whenConditions,
} from "../../Model/types";

export type State = {
  selectedRoutine: number | undefined;
  selectedActivityPath: number | undefined;
  parentRoutine: number | undefined;
  parentActivity: number | undefined;
  routines: EntityState<Routine>;
  activityPaths: EntityState<ActivityPath>;
  damages: EntityState<Damage>;
  effects: EntityState<Effect>;

  importRoutine: ImportStates;
};

export interface Adjustment {
  [key: number]: number;
}
export interface Routine {
  id: number;
  name: string;
  display: boolean;
  apIds: number[];
  levelDiff: number;
  description: string;
  startLevel: number;
  endLevel: number;
}
export interface RoutineObject {
  id: number;
  name: string;
  display: boolean;
  apIds: ActivityPathObject[];
  levelDiff: number;
  description: string;
  startLevel: number;
  endLevel: number;
}
export interface ActivityPath {
  id: number;
  parentId?: number;
  routineId?: number;
  condition: Condition;

  rollType: RollType;
  type: ActivityType;
  profTrend: ProfTrend;
  statTrend: StatTrend;
  itemTrend: ItemTrend;
  bonusAdjustments: Adjustment;
  MAP: MAP;

  targetType: Defense;
  damages: number[];
  effects: number[];
  apIds: number[];
}
export interface ActivityPathObject {
  id: number;
  parentId?: number;
  routineId?: number;
  condition: Condition;

  rollType: RollType;
  type: ActivityType;
  profTrend: ProfTrend;
  statTrend: StatTrend;
  itemTrend: ItemTrend;
  bonusAdjustments: Adjustment;
  MAP: MAP;

  targetType: Defense;
  damages: Damage[];
  effects: Effect[];
  apIds: ActivityPathObject[];
}
export interface Damage {
  id: number;
  damageCondition: DamageCond;

  dieTrend: DieTrend;
  dieAdjustments: Adjustment;
  diceSize: number;
  fatal: boolean;
  fatalDie: number;
  damageTrend: DamageTrend[];
  damageAdjustments: Adjustment;

  damageType: DamageType;
  material: Material;
  persistent: boolean;
  multiplier: number;
  damageWhen: WhenConditions[];
}
export interface Effect {
  id: number;
  effectCondition: Condition;
  effectType: EffectType;
  effectValue: number | undefined;
  startLevel: number;
  endLevel: number;
  damageWhen: WhenConditions[];
}

export function isRoutineObject(routine: any): routine is RoutineObject {
  return (
    typeof routine === "object" &&
    typeof routine.name === "string" &&
    typeof routine.display === "boolean" &&
    typeof routine.levelDiff === "number" &&
    typeof routine.description === "string" &&
    isActivityPaths(routine.apIds) &&
    typeof routine.startLevel === "number" &&
    typeof routine.endLevel === "number"
  );
}
function isActivityPaths(apIds: unknown): apIds is ActivityPathObject[] {
  if (Array.isArray(apIds)) {
    for (let apId of apIds) {
      if (
        !(
          Object.values(conditions).includes(apId.condition) &&
          Object.values(rollTypes).includes(apId.rollType) &&
          Object.values(activityTypes).includes(apId.type) &&
          Object.values(profTrends).includes(apId.profTrend) &&
          Object.values(statTrends).includes(apId.statTrend) &&
          Object.values(itemTrends).includes(apId.itemTrend) &&
          isAdjustment(apId.bonusAdjustments) &&
          Object.values(MAPs).includes(apId.MAP) &&
          Object.values(defenses).includes(apId.targetType) &&
          isActivityPaths(apId.apIds) &&
          isDamages(apId.damages) &&
          isEffects(apId.effects)
        )
      ) {
        return false;
      }
    }
    return true;
  }
  // console.log("6");
  return false;
}
function isAdjustment(adjustments: any): adjustments is Adjustment {
  if (typeof adjustments !== "object") {
    return false;
  }
  for (let i = 1; i <= 20; i++) {
    if (typeof adjustments[i] !== "number") {
      return false;
    }
  }
  return true;
}
function isDamages(damages: unknown): damages is Damage[] {
  if (Array.isArray(damages)) {
    for (let damage of damages) {
      if (Array.isArray(damage.damageTrend)) {
        for (let dt of damage.damageTrend) {
          if (!Object.values(damageTrends).includes(dt)) {
            return false;
          }
        }
      }

      if (Array.isArray(damage.damageWhen)) {
        for (let dw of damage.damageWhen) {
          if (!Object.values(whenConditions).includes(dw)) {
            return false;
          }
        }
      }

      if (
        !(
          Object.values(dCond).includes(damage.damageCondition) &&
          Object.values(dieTrends).includes(damage.dieTrend) &&
          isAdjustment(damage.dieAdjustments) &&
          typeof damage.diceSize === "number" &&
          typeof damage.fatal === "boolean" &&
          typeof damage.fatalDie === "number" &&
          isAdjustment(damage.damageAdjustments) &&
          Object.values(damageTypes).includes(damage.damageType) &&
          Object.values(materials).includes(damage.material) &&
          typeof damage.persistent === "boolean" &&
          [0.5, 1, 2].includes(damage.multiplier)
        )
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function isEffects(effects: unknown): effects is Effect[] {
  if (Array.isArray(effects)) {
    for (let effect of effects) {
      if (Array.isArray(effect.damageWhen)) {
        for (let dw of effect.damageWhen) {
          if (!Object.values(whenConditions).includes(dw)) {
            return false;
          }
        }
      }

      if (
        !(
          Object.values(conditions).includes(effect.effectCondition) &&
          Object.values(effectTypes).includes(effect.effectType) &&
          typeof effect.startLevel === "number" &&
          typeof effect.endLevel === "number"
        )
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}
