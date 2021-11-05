import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import {
  classWeaponMAP,
  classWeaponProf,
  classAdjustments,
  StrikeInfo,
  activityWeaponDiceAdjustments,
  classWeaponDamageTrends,
  hasDeadly,
  hasFatal,
  hasPickCritSpec,
  critSpecDamage,
  hasKnifeCritSpec,
  critSpecDice,
  classDamageAdjustments,
  hasCritSpecEffect,
  hasSwordCritSpec,
  hasHammerCritSpec,
  hasSpearCritSpec,
} from "../Model/newActivityInfo";
import {
  activityTypes,
  conditions,
  profTrends,
  defenses,
  MAPs,
  nextMAPs,
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
  diceSizes,
  effectStateTypes,
  effectValueTypes,
} from "../Model/types";
import { damageTypes, dCond, dieTrends, materials } from "../Model/types";
import { RootState } from "../store";

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
}
export interface Effect {
  id: number;
  effectCondition: Condition;
  effectType: EffectType;
  effectValue: number | undefined;
  startLevel: number;
  endLevel: number;
}

export const routinesAdapter = createEntityAdapter<Routine>();
export const activityPathAdapter = createEntityAdapter<ActivityPath>();
export const damageAdapter = createEntityAdapter<Damage>();
export const effectAdapter = createEntityAdapter<Effect>();
type State = {
  selectedRoutine: number | undefined;
  selectedActivityPath: number | undefined;
  parentRoutine: number | undefined;
  parentActivity: number | undefined;
  routines: EntityState<Routine>;
  activityPaths: EntityState<ActivityPath>;
  damages: EntityState<Damage>;
  effects: EntityState<Effect>;
};

let routineId = 100;
let activityPathId = 1000;
let damageId = 1000;
let effectId = 1000;

const empty: { [key: number]: number } = {};
const one: { [key: number]: number } = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
  one[i] = 1;
}
const defaultStrikeParent = {
  rollType: rollTypes.NORMAL,
  type: activityTypes.STRIKE,
  profTrend: profTrends.MARTIALWEAPON,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.WEAPON,
  bonusAdjustments: { ...empty },
  MAP: MAPs.N1,
  targetType: defenses.AC,

  damages: [0, 1],
  effects: [0],
};
const defaultSaveParent = {
  rollType: rollTypes.NORMAL,
  type: activityTypes.SAVE,
  profTrend: profTrends.CASTERSPELL,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.NONE,
  bonusAdjustments: { ...empty },
  MAP: MAPs.N1,
  targetType: defenses.REF,

  damages: [2],
  effects: [],
};
const defaultDamage = {
  damageCondition: dCond.STRIKE,
  damageType: damageTypes.S,
  material: materials.NONE,
  persistent: false,
  multiplier: 1,

  dieTrend: dieTrends.NONE,
  dieAdjustments: { ...empty },
  diceSize: 6,
  fatal: false,
  fatalDie: 10,
  damageTrend: [],
  damageAdjustments: { ...empty },
};

const removeActivityPaths = (state: WritableDraft<State>, ids: number[]) => {
  let index = 0;
  while (index < ids.length) {
    let ap = state.activityPaths.entities[ids[index]]!;
    ids.push(...ap!.apIds);
    damageAdapter.removeMany(state.damages, ap.damages);
    effectAdapter.removeMany(state.effects, ap.effects);
    activityPathAdapter.removeOne(state.activityPaths, ap.id);
    index += 1;
  }
};
const createStrikeActivity = (
  state: WritableDraft<State>,
  id: number,
  parentId: number | undefined,
  routineId: number | undefined,
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  // copy parent damages and effects
  let damages = createStrikeDamages(state, strikeInfo, strikeNumber);
  let effects = createStrikeEffects(state, strikeInfo, strikeNumber);
  let MAP = classWeaponMAP(strikeInfo);

  activityPathAdapter.addOne(state.activityPaths, {
    id,
    parentId,
    routineId,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.STRIKE,
    profTrend: classWeaponProf(strikeInfo.cClass),
    statTrend: strikeInfo.attackScore,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: classAdjustments(strikeInfo, strikeNumber),
    MAP:
      strikeNumber === 0
        ? MAP
        : strikeNumber === 1
        ? nextMAPs[MAP]
        : nextMAPs[nextMAPs[MAP]],

    targetType: defenses.AC,

    damages: damages,
    effects: effects,
    apIds: [],
  });
  return;
};
const createStrikeDamages = (
  state: WritableDraft<State>,
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  const newDamages: number[] = [];

  let id = ++damageId;
  const weaponDamage: Damage = {
    id,
    damageCondition: dCond.STRIKE,
    dieTrend: dieTrends.WEAPON,
    dieAdjustments: activityWeaponDiceAdjustments(strikeInfo),
    diceSize: strikeInfo.dieSize,
    fatal: hasFatal(strikeInfo),
    fatalDie: strikeInfo.fatalSize,
    damageTrend: classWeaponDamageTrends(strikeInfo, strikeNumber),
    damageAdjustments: classDamageAdjustments(strikeInfo),
    damageType: damageTypes.B,
    material: materials.NONE,
    multiplier: 1,
    persistent: false,
  };
  damageAdapter.addOne(state.damages, weaponDamage);
  newDamages.push(id);

  id = ++damageId;
  const runeDamage: Damage = {
    id,
    damageCondition: dCond.STRIKE,
    dieTrend: strikeInfo.runes,
    dieAdjustments: empty,
    diceSize: diceSizes[6],
    fatal: false,
    fatalDie: strikeInfo.fatalSize,
    damageTrend: [],
    damageAdjustments: empty,
    damageType: damageTypes.FIRE,
    material: materials.NONE,
    multiplier: 1,
    persistent: false,
  };
  damageAdapter.addOne(state.damages, runeDamage);
  newDamages.push(id);

  if (hasDeadly(strikeInfo)) {
    let damageAdjustments = empty;
    if (!hasFatal(strikeInfo) && hasPickCritSpec(strikeInfo))
      damageAdjustments = critSpecDamage(strikeInfo);
    id = ++damageId;
    const critDamage: Damage = {
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.DEADLY,
      dieAdjustments: empty,
      diceSize: strikeInfo.deadlySize,
      fatal: false,
      fatalDie: strikeInfo.fatalSize,
      damageTrend: [],
      damageAdjustments,
      damageType: damageTypes.B,
      material: materials.NONE,
      multiplier: 1,
      persistent: false,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (hasFatal(strikeInfo)) {
    let damageAdjustments = empty;
    if (hasPickCritSpec(strikeInfo))
      damageAdjustments = critSpecDamage(strikeInfo);
    id = ++damageId;
    const critDamage: Damage = {
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.NONE,
      dieAdjustments: one,
      diceSize: strikeInfo.fatalSize,
      fatal: false,
      fatalDie: strikeInfo.fatalSize,
      damageTrend: [],
      damageAdjustments,
      damageType: damageTypes.B,
      material: materials.NONE,
      multiplier: 1,
      persistent: false,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (
    !hasDeadly(strikeInfo) &&
    !hasFatal(strikeInfo) &&
    hasPickCritSpec(strikeInfo)
  ) {
    let damageAdjustments = critSpecDamage(strikeInfo);
    id = ++damageId;
    const critDamage: Damage = {
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.NONE,
      dieAdjustments: empty,
      diceSize: strikeInfo.fatalSize,
      fatal: false,
      fatalDie: strikeInfo.fatalSize,
      damageTrend: [],
      damageAdjustments,
      damageType: damageTypes.B,
      material: materials.NONE,
      multiplier: 1,
      persistent: false,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (hasKnifeCritSpec(strikeInfo)) {
    let damageAdjustments = critSpecDamage(strikeInfo);
    id = ++damageId;
    const critDamage: Damage = {
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.NONE,
      dieAdjustments: critSpecDice(strikeInfo),
      diceSize: diceSizes[6],
      fatal: false,
      fatalDie: strikeInfo.fatalSize,
      damageTrend: [],
      damageAdjustments,
      damageType: damageTypes.B,
      material: materials.NONE,
      multiplier: 1,
      persistent: true,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }

  return newDamages;
};
const createStrikeEffects = (
  state: WritableDraft<State>,
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  const newEffects: number[] = [];
  let id;

  if (hasCritSpecEffect(strikeInfo)) {
    let effectType: EffectType = effectStateTypes.FLATFOOT;
    if (hasSwordCritSpec(strikeInfo)) effectType = effectStateTypes.FLATFOOT;
    if (hasHammerCritSpec(strikeInfo)) effectType = effectStateTypes.PRONE;
    if (hasSpearCritSpec(strikeInfo)) effectType = effectValueTypes.CLUMSY;

    id = ++effectId;
    const critSpecEffect: Effect = {
      id,
      effectCondition: conditions.CRIT,
      effectType,
      effectValue: 1,
      startLevel: strikeInfo.critSpecLevel,
      endLevel: 20,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, critSpecEffect);
  }
  return newEffects;
};

const copyDamages = (state: WritableDraft<State>, damages: number[]) => {
  const newDamages = [];
  for (let did of damages) {
    let damage = state.damages.entities[did]!;
    // create a new damage entity and add it's id to newDamages
    const id = ++damageId;
    damageAdapter.addOne(state.damages, { ...damage, id });
    newDamages.push(id);
  }
  return newDamages;
};
const copyEffects = (state: WritableDraft<State>, effects: number[]) => {
  const newEffects = [];
  for (let eid of effects) {
    let effect = state.effects.entities[eid]!;
    // create a new effect entity and add it's id to newEffects
    const id = ++effectId;
    effectAdapter.addOne(state.effects, { ...effect, id });
    newEffects.push(id);
  }
  return newEffects;
};
const copyActivityPaths = (
  state: WritableDraft<State>,
  apIds: number[],
  parentId?: number,
  routineId?: number
) => {
  let newApIds = [];
  for (let apId of apIds) {
    const id = ++activityPathId;
    const ap = state.activityPaths.entities[apId]!;
    const apIds = copyActivityPaths(state, ap.apIds, id);
    const damages = copyDamages(state, ap.damages);
    const effects = copyEffects(state, ap.effects);

    activityPathAdapter.addOne(state.activityPaths, {
      ...ap,
      id,
      parentId,
      routineId,
      damages,
      effects,
      apIds,
    });
    newApIds.push(id);
  }
  return newApIds;
};

const getActivityPaths = (state: WritableDraft<State>, apIds: number[]) => {
  let newAps: ActivityPathObject[] = [];
  for (let apId of apIds) {
    const ap = state.activityPaths.entities[apId]!;
    const aps = getActivityPaths(state, ap.apIds);
    const damages = getDamages(state, ap.damages);
    const effects = getEffects(state, ap.effects);
    newAps.push({ ...ap, apIds: aps, damages, effects });
  }
  return newAps;
};
const getDamages = (state: WritableDraft<State>, damages: number[]) => {
  let newDamages = [];
  for (let did of damages) {
    const damage = state.damages.entities[did]!;
    newDamages.push({ ...damage });
  }
  return newDamages;
};
const getEffects = (state: WritableDraft<State>, effects: number[]) => {
  let newEffects = [];
  for (let eid of effects) {
    const damage = state.effects.entities[eid]!;
    newEffects.push({ ...damage });
  }
  return newEffects;
};

function isRoutineObject(routine: any): routine is RoutineObject {
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
        console.log(apId);
        console.log(
          Object.values(conditions).includes(apId.condition) &&
            Object.values(rollTypes).includes(apId.rollType) &&
            Object.values(activityTypes).includes(apId.type)
        );
        console.log(
          Object.values(profTrends).includes(apId.profTrend) &&
            Object.values(statTrends).includes(apId.statTrend) &&
            Object.values(itemTrends).includes(apId.itemTrend)
        );
        console.log(
          Object.values(MAPs).includes(apId.MAP) &&
            Object.values(defenses).includes(apId.targetType)
        );
        console.log(isActivityPaths(apId.apIds));
        console.log(isDamages(apId.damages));
        console.log(isEffects(apId.effects));
        console.log(isAdjustment(apId.bonusAdjustments));
        return false;
      }
    }
    return true;
  }
  console.log("6");
  return false;
}
function isAdjustment(adjustments: any): adjustments is Adjustment {
  if (typeof adjustments !== "object") {
    console.log("1");
    return false;
  }
  for (let i = 1; i <= 20; i++) {
    if (typeof adjustments[i] !== "number") {
      console.log(2);
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
            console.log("3");
            return false;
          }
        }
      } else {
        console.log("4");
        return false;
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
        console.log(damage);
        console.log(
          Object.values(dCond).includes(damage.damageCondition) &&
            Object.values(dieTrends).includes(damage.dieTrend)
        );
        console.log(
          typeof damage.diceSize === "number" &&
            typeof damage.fatal === "boolean" &&
            typeof damage.fatalDie === "number"
        );
        console.log(
          Object.values(damageTypes).includes(damage.damageType) &&
            Object.values(materials).includes(damage.material) &&
            typeof damage.persistent === "boolean"
        );

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
      if (
        !(
          Object.values(conditions).includes(effect.effectCondition) &&
          Object.values(effectTypes).includes(effect.effectType) &&
          typeof effect.startLevel === "number" &&
          typeof effect.endLevel === "number"
        )
      ) {
        console.log(effect);
        return false;
      }
    }
    return true;
  }
  return false;
}
const insertRoutine = (state: WritableDraft<State>, routine: RoutineObject) => {
  const id = ++routineId;
  const apIds = insertActivityPaths(state, routine.apIds, undefined, id);

  routinesAdapter.addOne(state.routines, { ...routine, id, apIds });
  return id;
};
const insertActivityPaths = (
  state: WritableDraft<State>,
  aps: ActivityPathObject[],
  parentId?: number,
  routineId?: number
) => {
  let newApIds = [];
  for (let ap of aps) {
    const id = ++activityPathId;
    const apIds = insertActivityPaths(state, ap.apIds, id);
    const damages = insertDamages(state, ap.damages);
    const effects = insertEffects(state, ap.effects);

    activityPathAdapter.addOne(state.activityPaths, {
      ...ap,
      id,
      parentId,
      routineId,
      damages,
      effects,
      apIds,
    });
    newApIds.push(id);
  }
  return newApIds;
};
const insertDamages = (state: WritableDraft<State>, damages: Damage[]) => {
  const newDamages = [];
  for (let damage of damages) {
    // create a new damage entity and add it's id to newDamages
    const id = ++damageId;
    damageAdapter.addOne(state.damages, { ...damage, id });
    newDamages.push(id);
  }
  return newDamages;
};
const insertEffects = (state: WritableDraft<State>, effects: Effect[]) => {
  const newEffects = [];
  for (let effect of effects) {
    // create a new effect entity and add it's id to newEffects
    const id = ++effectId;
    effectAdapter.addOne(state.effects, { ...effect, id });
    newEffects.push(id);
  }
  return newEffects;
};
// if ( true ) {
//   const id = ++routineId;

//   routinesAdapter.addOne(state.routines, {
//       id,
//       name: "New Routine",
//       display: true,
//       apIds: [],
//       levelDiff: 0,
//       description: "Enter a description here.",
//       startLevel: 1,
//       endLevel: 20,
//     });

//   state.selectedRoutine = id;
// // }
// let selectedRoutine: number | undefined;
// let selectedActivityPath: number | undefined;
// let parentRoutine: number | undefined;
// let parentActivity: number | undefined;

const initialState: State = {
  selectedRoutine: 0,
  selectedActivityPath: undefined,
  parentRoutine: 0,
  parentActivity: undefined,
  routines: routinesAdapter.getInitialState(),
  activityPaths: activityPathAdapter.getInitialState(),
  damages: damageAdapter.getInitialState(),
  effects: effectAdapter.getInitialState(),
};
// initialState.selectedRoutine = 0;
// initialState.selectedActivityPath = undefined;
// initialState.parentRoutine = 0;
// initialState.parentActivity = undefined;

export const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {
    setRoutine: (state, action) => {
      state.selectedRoutine = action.payload;
      state.selectedActivityPath = undefined;
      state.parentActivity = undefined;
      state.parentRoutine = undefined;
    },
    setActivityPath: (state, action) => {
      state.selectedActivityPath = action.payload;
      state.parentActivity = undefined;
      state.parentRoutine = undefined;
    },

    routineAdded: (state, action) => {
      routinesAdapter.addOne(state.routines, action);
    },
    routineUpdated: (state, action: PayloadAction<Update<Routine>>) => {
      routinesAdapter.updateOne(state.routines, action);
    },
    activityPathAdded: (state, action) => {
      activityPathAdapter.addOne(state.activityPaths, action);
    },
    activityPathUpdated: (state, action) => {
      activityPathAdapter.updateOne(state.activityPaths, action);
    },
    damageAdded: (state, action) => {
      damageAdapter.addOne(state.damages, action);
    },
    damageUpdated: (state, action) => {
      damageAdapter.updateOne(state.damages, action);
    },
    effectAdded: (state, action) => {
      effectAdapter.addOne(state.effects, action);
    },
    effectUpdated: (state, action) => {
      effectAdapter.updateOne(state.effects, action);
    },

    routineCreated: {
      reducer: (
        state,
        action: PayloadAction<{ id: number; copy: boolean }>
      ) => {
        const { id, copy } = action.payload;
        if (copy && state.selectedRoutine !== undefined) {
          const routine = state.routines.entities[state.selectedRoutine]!;
          const name = "Copy of " + routine.name;
          const apIds = copyActivityPaths(state, routine.apIds, undefined, id);
          routinesAdapter.addOne(state.routines, {
            ...routine,
            id,
            name,
            apIds,
          });
        } else {
          routinesAdapter.addOne(state.routines, {
            id,
            name: "New Routine",
            display: true,
            apIds: [],
            levelDiff: 0,
            description: "Enter a description here.",
            startLevel: 1,
            endLevel: 20,
          });
        }
        state.selectedRoutine = id;
        state.selectedActivityPath = undefined;
        state.parentActivity = undefined;
        state.parentRoutine = undefined;
      },
      prepare: ({ copy = false }) => {
        const id = ++routineId;
        return { payload: { id, copy } };
      },
    },
    routineRemoved: (state, action) => {
      // recursively remove all children
      // can't remove last routine...
      if (state.routines.ids.length === 1) return;
      const routineId = action.payload;
      let childrenIds = state.routines.entities[routineId]!.apIds;
      removeActivityPaths(state, childrenIds);

      routinesAdapter.removeOne(state.routines, routineId);
      if (routineId === state.selectedRoutine) {
        state.selectedRoutine = state.routines.ids[0] as number;
        state.selectedActivityPath = undefined;
        state.parentActivity = undefined;
        state.parentRoutine = undefined;
      }
    },
    setNewActivityParent: (
      state,
      action: PayloadAction<{
        parentId?: number;
        routineId?: number;
      }>
    ) => {
      state.parentRoutine = action.payload.routineId;
      state.parentActivity = action.payload.parentId;
      state.selectedActivityPath = undefined;
    },
    activityPathCreated: {
      reducer: (
        state,
        action: PayloadAction<{
          ids: number[];
          strikeInfo: StrikeInfo;
        }>
      ) => {
        const { ids, strikeInfo } = action.payload;

        const { parentActivity: parentId, parentRoutine: routineId } = state;
        if (routineId !== undefined)
          state.routines.entities[routineId]!.apIds.push(ids[0]);
        if (parentId !== undefined) {
          state.activityPaths.entities[parentId]!.apIds.push(ids[0]);
        }
        createStrikeActivity(state, ids[0], parentId, routineId, strikeInfo, 0);
        for (let i = 1; i < strikeInfo.numStrikes; i++) {
          let parentId = ids[i - 1];
          state.activityPaths.entities[parentId]!.apIds.push(ids[i]);
          createStrikeActivity(
            state,
            ids[i],
            parentId,
            undefined,
            strikeInfo,
            i
          );
        }
        state.selectedActivityPath = ids[0];
        state.parentActivity = undefined;
        state.parentRoutine = undefined;
      },
      prepare: ({
        parentId,
        routineId,
        strikeInfo,
      }: {
        parentId?: number;
        routineId?: number;
        strikeInfo: StrikeInfo;
      }) => {
        const ids = [];
        for (let i = 0; i < strikeInfo.numStrikes; i++) {
          let id = ++activityPathId;
          ids.push(id);
        }
        return {
          payload: {
            ids,
            parentId,
            routineId,
            strikeInfo,
          },
        };
      },
    },
    activityPathContinued: {
      reducer: (
        state,
        action: PayloadAction<{
          id: number;
          parentId?: number;
          routineId?: number;
          isStrike: boolean;
          applyMAP: boolean;
        }>
      ) => {
        const { id, parentId, routineId, isStrike, applyMAP } = action.payload;

        let parentAP;
        if (routineId !== undefined)
          state.routines.entities[routineId]!.apIds.push(id);
        if (parentId !== undefined) {
          state.activityPaths.entities[parentId]!.apIds.push(id);
          parentAP = state.activityPaths.entities[parentId]!;
          if (isStrike && parentAP.type !== activityTypes.STRIKE) {
            parentAP = defaultStrikeParent;
          }
          if (!isStrike && parentAP.type !== activityTypes.SAVE) {
            parentAP = defaultSaveParent;
          }
        } else {
          parentAP = isStrike ? defaultStrikeParent : defaultSaveParent;
        }
        // copy parent damages and effects
        let newDamages = copyDamages(state, parentAP.damages);
        let newEffects = copyEffects(state, parentAP.effects);

        activityPathAdapter.addOne(state.activityPaths, {
          id,
          parentId,
          routineId,
          condition: conditions.ALWAYS,

          rollType: rollTypes.NORMAL,
          type: parentAP.type,
          profTrend: parentAP.profTrend,
          statTrend: parentAP.statTrend,
          itemTrend: parentAP.itemTrend,
          bonusAdjustments: { ...parentAP.bonusAdjustments },
          MAP: applyMAP ? nextMAPs[parentAP.MAP] : parentAP.MAP,

          targetType: parentAP.targetType,

          damages: newDamages,
          effects: newEffects,
          apIds: [],
        });
        state.selectedActivityPath = id;
      },
      prepare: ({ parentId, routineId, isStrike = true, applyMAP = false }) => {
        const id = ++activityPathId;
        return {
          payload: {
            id,
            parentId,
            routineId,
            isStrike,
            applyMAP,
          },
        };
      },
    },
    activityPathRemoved: (state, action) => {
      const { id, parentId, routineId } = action.payload;

      // recursively remove all children
      let childrenIds = [id];
      removeActivityPaths(state, childrenIds);

      if (parentId !== undefined) {
        state.activityPaths.entities[parentId]!.apIds =
          state.activityPaths.entities[parentId]!.apIds.filter(
            (apId) => apId !== id
          );
      }
      if (routineId !== undefined) {
        state.routines.entities[routineId]!.apIds = state.routines.entities[
          routineId
        ]!.apIds.filter((apId) => apId !== id);
      }
      state.selectedActivityPath = undefined;
    },

    damageCreated: {
      reducer: (
        state,
        action: PayloadAction<{
          id: number;
          parentId: number;
        }>
      ) => {
        const { id, parentId } = action.payload;
        state.activityPaths.entities[parentId]!.damages.push(id);
        damageAdapter.addOne(state.damages, { id, ...defaultDamage });
      },
      prepare: ({ parentId }) => {
        const id = ++damageId;
        return {
          payload: {
            id,
            parentId,
          },
        };
      },
    },
    damageRemoved: (
      state,
      action: PayloadAction<{
        id: number;
        parentId: number;
      }>
    ) => {
      const { id, parentId } = action.payload;
      state.activityPaths.entities[parentId]!.damages =
        state.activityPaths.entities[parentId]!.damages.filter(
          (did) => did !== id
        );
      damageAdapter.removeOne(state.damages, id);
    },
    effectCreated: {
      reducer: (
        state,
        action: PayloadAction<{
          id: number;
          parentId: number;
        }>
      ) => {
        const { id, parentId } = action.payload;
        state.activityPaths.entities[parentId]!.effects.push(id);
        effectAdapter.addOne(state.effects, {
          id,
          effectCondition: conditions.ALWAYS,
          effectType: effectTypes.FLATFOOT,
          effectValue: 0,
          startLevel: 1,
          endLevel: 20,
        });
      },
      prepare: ({ parentId }) => {
        const id = ++effectId;
        return {
          payload: {
            id,
            parentId,
          },
        };
      },
    },
    effectRemoved: (state, action) => {
      const { id, parentId } = action.payload;
      state.activityPaths.entities[parentId]!.effects =
        state.activityPaths.entities[parentId]!.effects.filter(
          (eid) => eid !== id
        );
      effectAdapter.removeOne(state.effects, id);
    },
    importRoutine: (state, action) => {
      try {
        // console.log(action.payload);
        const routineObject = JSON.parse(action.payload);
        // console.log("parsed");
        // console.log(routineObject);
        // console.log(validateRoutine(routineObject));
        if (isRoutineObject(routineObject)) {
          state.selectedRoutine = insertRoutine(state, routineObject);
          state.selectedActivityPath = undefined;
          state.parentActivity = undefined;
          state.parentRoutine = undefined;
        }
      } catch (error) {
        console.log(error);
        console.log("Parsing failed");
      }
    },
  },
});

export const {
  setRoutine,
  setActivityPath,
  setNewActivityParent,

  routineAdded,
  routineUpdated,
  routineCreated,
  routineRemoved,

  activityPathAdded,
  activityPathUpdated,
  activityPathCreated,
  activityPathContinued,
  activityPathRemoved,

  damageAdded,
  damageUpdated,
  damageCreated,
  damageRemoved,

  effectAdded,
  effectUpdated,
  effectCreated,
  effectRemoved,

  importRoutine,
} = routinesSlice.actions;

export default routinesSlice.reducer;

export const {
  selectById: selectRoutineById,
  selectIds: selectRoutineIds,
  selectEntities: selectRoutineEntities,
  selectAll: selectAllRoutines,
  selectTotal: selectTotalRoutines,
} = routinesAdapter.getSelectors((state: RootState) => state.routines.routines);

export const {
  selectById: selectactivityPathById,
  selectIds: selectactivityPathIds,
  selectEntities: selectactivityPathEntities,
  selectAll: selectAllactivityPaths,
  selectTotal: selectTotalactivityPaths,
} = activityPathAdapter.getSelectors(
  (state: RootState) => state.routines.activityPaths
);

export const {
  selectById: selectdamageById,
  selectIds: selectdamageIds,
  selectEntities: selectdamageEntities,
  selectAll: selectAlldamages,
  selectTotal: selectTotaldamages,
} = damageAdapter.getSelectors((state: RootState) => state.routines.damages);

export const {
  selectById: selecteffectById,
  selectIds: selecteffectIds,
  selectEntities: selecteffectEntities,
  selectAll: selectAlleffects,
  selectTotal: selectTotaleffects,
} = effectAdapter.getSelectors((state: RootState) => state.routines.effects);

export const selectSelectedRoutine = (state: RootState) =>
  state.routines.selectedRoutine;
export const selectSelectedActivityPath = (state: RootState) =>
  state.routines.selectedActivityPath;
export const selectParentActivityId = (state: RootState) =>
  state.routines.parentActivity;
export const selectCreateNewActivity = (state: RootState) =>
  state.routines.selectedActivityPath === undefined &&
  (state.routines.parentRoutine !== undefined ||
    state.routines.parentActivity !== undefined);
export const selectSelectedRoutineObject = (state: RootState) => {
  if (state.routines.selectedRoutine) {
    const routine =
      state.routines.routines.entities[state.routines.selectedRoutine]!;
    const routineObject = {
      ...routine,
      apIds: getActivityPaths(state.routines, routine.apIds),
    };
    return routineObject;
  }
  return undefined;
};
