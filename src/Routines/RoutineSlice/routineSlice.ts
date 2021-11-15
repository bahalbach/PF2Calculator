import {
  createEntityAdapter,
  createSlice,
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
  hasClassDamageDice,
  classDamageDice,
  hasActivityDamageDice,
  activityDamageDice,
  SkillInfo,
  getSkillEffects,
  hasSkillDamage,
  getSkillTarget,
  CantripInfo,
  SpellInfo,
  getCantripTarget,
  getCantripDamage,
  getSpellTarget,
} from "../../Model/newActivityInfo";
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
  EffectType,
  diceSizes,
  damageTypes,
  dCond,
  dieTrends,
  materials,
  effectStateTypes,
  effectValueTypes,
  whenConditions,
  importStates,
  ActivityType,
} from "../../Model/types";
import { RootState } from "../../App/store";
import {
  ActivityPath,
  ActivityPathObject,
  Damage,
  Effect,
  isRoutineObject,
  Routine,
  RoutineObject,
  State,
} from "./RoutineTypes";

export const routinesAdapter = createEntityAdapter<Routine>();
export const activityPathAdapter = createEntityAdapter<ActivityPath>();
export const damageAdapter = createEntityAdapter<Damage>();
export const effectAdapter = createEntityAdapter<Effect>();

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

const initialState: State = {
  selectedRoutine: 0,
  selectedActivityPath: undefined,
  parentRoutine: 0,
  parentActivity: undefined,
  routines: routinesAdapter.getInitialState(),
  activityPaths: activityPathAdapter.getInitialState(),
  damages: damageAdapter.getInitialState(),
  effects: effectAdapter.getInitialState(),
  importRoutine: importStates.MessageSeen,
};

const defaultActivity = {
  type: activityTypes.STRIKE,
  condition: conditions.ALWAYS,
  rollType: rollTypes.NORMAL,
  profTrend: profTrends.TRAINED,
  statTrend: statTrends.AS10,
  itemTrend: itemTrends.NONE,
  bonusAdjustments: empty,
  MAP: MAPs.N1,
  targetType: defenses.AC,
  damages: [],
  effects: [],
  apIds: [],
};
const defaultStrikeParent = {
  profTrend: profTrends.MARTIALWEAPON,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.WEAPON,
  damages: [0, 1],
  effects: [0],
};
const defaultSaveParent = {
  type: activityTypes.SAVE,
  profTrend: profTrends.CASTERSPELL,
  statTrend: statTrends.AS18a,
  targetType: defenses.REF,
  damages: [2],
  effects: [],
};
const defaultDamage = {
  damageCondition: dCond.STRIKE,
  damageType: damageTypes.B,
  material: materials.NONE,
  persistent: false,
  multiplier: 1,
  damageWhen: [whenConditions.Always],

  dieTrend: dieTrends.NONE,
  dieAdjustments: empty,
  diceSize: 6,
  fatal: false,
  fatalDie: 10,
  damageTrend: [],
  damageAdjustments: empty,
};
const defaultEffect = {
  effectCondition: conditions.ALWAYS,
  effectType: effectTypes.FLATFOOT,
  effectValue: 0,
  startLevel: 1,
  endLevel: 20,
  damageWhen: [whenConditions.Always],
};

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
      if (state.selectedActivityPath === action.payload) {
        state.selectedActivityPath = undefined;
      } else {
        state.selectedActivityPath = action.payload;
      }
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
          const name = routine.name + " Copy";
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
      const routineId = action.payload;
      let childrenIds = state.routines.entities[routineId]!.apIds;
      removeActivityPaths(state, childrenIds);

      routinesAdapter.removeOne(state.routines, routineId);
      if (routineId === state.selectedRoutine) {
        state.selectedRoutine = undefined;
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
    emptyActivityPathCreated: {
      reducer: (
        state,
        action: PayloadAction<{
          id: number;
          routineId: number;
          activityType?: ActivityType;
        }>
      ) => {
        const { id, routineId, activityType } = action.payload;
        let ap = {
          ...defaultActivity,
          profTrend: profTrends.UNTRAINED,
          id,
          routineId,
        } as ActivityPath;
        if (activityType !== undefined) {
          if (activityType === activityTypes.STRIKE) {
            let damages = copyDamages(state, defaultStrikeParent.damages);
            let effects = copyEffects(state, defaultStrikeParent.effects);
            ap = {
              ...defaultActivity,
              ...defaultStrikeParent,
              id,
              routineId,
              damages,
              effects,
            };
          }
          if (activityType === activityTypes.SAVE) {
            let damages = copyDamages(state, defaultSaveParent.damages);
            let effects = copyEffects(state, defaultSaveParent.effects);
            ap = {
              ...defaultActivity,
              ...defaultSaveParent,
              id,
              routineId,
              damages,
              effects,
            };
          }
        }

        state.routines.entities[routineId]!.apIds.push(id);
        activityPathAdapter.addOne(state.activityPaths, ap);
        state.selectedActivityPath = id;
        state.parentActivity = undefined;
        state.parentRoutine = undefined;
      },
      prepare: ({
        routineId,
        activityType,
      }: {
        routineId: number;
        activityType?: ActivityType;
      }) => {
        const id = ++activityPathId;
        return {
          payload: {
            id,
            routineId,
            activityType,
          },
        };
      },
    },
    activityPathCreated: (
      state,
      action: PayloadAction<{
        strikeInfo?: StrikeInfo;
        skillInfo?: SkillInfo;
        cantripInfo?: CantripInfo;
        spellInfo?: SpellInfo;
      }>
    ) => {
      const { parentActivity: parentId, parentRoutine: routineId } = state;

      const { strikeInfo, skillInfo, cantripInfo, spellInfo } = action.payload;
      let ids: number[] = [];

      if (strikeInfo !== undefined) {
        ids = createStrikeActivity(
          state,
          parentId,
          routineId,
          strikeInfo,
          strikeInfo.numPrevStrikes
        );
      }
      if (skillInfo !== undefined) {
        ids = createSkillActivity(state, parentId, routineId, skillInfo);
      }
      if (cantripInfo !== undefined) {
        ids = createCantripActivity(state, parentId, routineId, cantripInfo);
      }
      if (spellInfo !== undefined) {
        ids = createSpellActivity(state, parentId, routineId, spellInfo);
      }

      if (routineId !== undefined) {
        state.routines.entities[routineId]!.apIds.push(...ids);
      }
      if (parentId !== undefined) {
        state.activityPaths.entities[parentId]!.apIds.push(...ids);
      }

      state.selectedActivityPath = ids[0];
      state.parentActivity = undefined;
      state.parentRoutine = undefined;
    },
    activityPathContinued: {
      reducer: (
        state,
        action: PayloadAction<{
          id: number;
          parentId: number;
        }>
      ) => {
        const { id, parentId } = action.payload;
        state.activityPaths.entities[parentId]!.apIds.push(id);
        const parentAP = state.activityPaths.entities[parentId]!;
        // copy parent damages and effects
        let newDamages = copyDamages(state, parentAP.damages);
        let newEffects = copyEffects(state, parentAP.effects);

        activityPathAdapter.addOne(state.activityPaths, {
          ...parentAP,
          id,
          parentId,
          routineId: undefined,
          MAP: nextMAPs[parentAP.MAP],
          damages: newDamages,
          effects: newEffects,
          apIds: [],
        });
        state.selectedActivityPath = id;
      },
      prepare: ({ parentId }: { parentId: number }) => {
        const id = ++activityPathId;
        return {
          payload: {
            id,
            parentId,
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
          ...defaultEffect,
          id,
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
        state.importRoutine = importStates.Importing;
        const routineObject = JSON.parse(action.payload);
        if (isRoutineObject(routineObject)) {
          state.selectedRoutine = insertRoutine(state, routineObject);
          state.selectedActivityPath = undefined;
          state.parentActivity = undefined;
          state.parentRoutine = undefined;
          state.importRoutine = importStates.Successful;
        } else {
          state.importRoutine = importStates.Failure;
        }
      } catch (error) {
        console.log(error);
        console.log("Parsing failed");
        state.importRoutine = importStates.Failure;
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
  emptyActivityPathCreated,
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
export const selectRoutineDescriptions = (state: RootState) => {
  return Object.values(state.routines.routines.entities)
    .filter((routine) => routine?.display)
    .map((routine) => routine?.name + ": " + routine?.description);
};

export const selectImportState = (state: RootState) => {
  return state.routines.importRoutine;
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
  parentId: number | undefined,
  routineId: number | undefined,
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  const id = ++activityPathId;
  let apIds: number[] = [];
  if (strikeNumber < strikeInfo.numStrikes - 1) {
    apIds = createStrikeActivity(
      state,
      id,
      undefined,
      strikeInfo,
      strikeNumber + 1
    );
  }
  let damages = createStrikeDamages(state, strikeInfo, strikeNumber);
  let effects = createStrikeEffects(state, strikeInfo, strikeNumber);
  let MAP = classWeaponMAP(strikeInfo);

  activityPathAdapter.addOne(state.activityPaths, {
    ...defaultActivity,
    id,
    parentId,
    routineId,
    type: activityTypes.STRIKE,
    profTrend: classWeaponProf(strikeInfo.cClass, strikeInfo.classOption),
    statTrend: strikeInfo.attackScore,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: classAdjustments(strikeInfo, strikeNumber),
    MAP:
      strikeNumber === 0
        ? MAP
        : strikeNumber === 1
        ? nextMAPs[MAP]
        : nextMAPs[nextMAPs[MAP]],

    damages,
    effects,
    apIds,
  });
  return [id];
};
const createStrikeDamages = (
  state: WritableDraft<State>,
  strikeInfo: StrikeInfo,
  strikeNumber: number
) => {
  const newDamages: number[] = [];

  let id = ++damageId;
  const weaponDamage: Damage = {
    ...defaultDamage,
    id,
    dieTrend: dieTrends.WEAPON,
    dieAdjustments: activityWeaponDiceAdjustments(strikeInfo),
    diceSize: strikeInfo.dieSize,
    fatal: hasFatal(strikeInfo),
    fatalDie: strikeInfo.fatalSize,
    damageTrend: classWeaponDamageTrends(strikeInfo, strikeNumber),
    damageAdjustments: classDamageAdjustments(strikeInfo),
  };
  damageAdapter.addOne(state.damages, weaponDamage);
  newDamages.push(id);

  id = ++damageId;
  const runeDamage: Damage = {
    ...defaultDamage,
    id,
    dieTrend: strikeInfo.runes,
    diceSize: diceSizes[6],
    damageType: damageTypes.FIRE,
  };
  damageAdapter.addOne(state.damages, runeDamage);
  newDamages.push(id);

  if (hasClassDamageDice(strikeInfo)) {
    let { dieTrend, diceSize, damageType, damageWhen } =
      classDamageDice(strikeInfo);
    id = ++damageId;
    const classDamage: Damage = {
      ...defaultDamage,
      id,
      dieTrend,
      diceSize,
      damageType,
      damageWhen,
    };
    damageAdapter.addOne(state.damages, classDamage);
    newDamages.push(id);
  }

  if (hasActivityDamageDice(strikeInfo)) {
    let { dieTrend, diceSize, damageType } = activityDamageDice(strikeInfo);
    id = ++damageId;
    const activityDamage: Damage = {
      ...defaultDamage,
      id,
      dieTrend,
      diceSize,
      damageType,
    };
    damageAdapter.addOne(state.damages, activityDamage);
    newDamages.push(id);
  }

  if (hasDeadly(strikeInfo)) {
    let damageAdjustments = empty;
    if (!hasFatal(strikeInfo) && hasPickCritSpec(strikeInfo))
      damageAdjustments = critSpecDamage(strikeInfo);
    id = ++damageId;
    const critDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.DEADLY,
      diceSize: strikeInfo.deadlySize,
      damageAdjustments,
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
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieAdjustments: one,
      diceSize: strikeInfo.fatalSize,
      damageAdjustments,
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
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      diceSize: strikeInfo.fatalSize,
      damageAdjustments,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (hasKnifeCritSpec(strikeInfo)) {
    let damageAdjustments = critSpecDamage(strikeInfo);
    id = ++damageId;
    const critDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieAdjustments: critSpecDice(strikeInfo),
      diceSize: diceSizes[6],
      damageAdjustments,
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
      ...defaultEffect,
      id,
      effectCondition: conditions.CRIT,
      effectType,
      effectValue: 1,
      startLevel: strikeInfo.critSpecLevel,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, critSpecEffect);
  }
  return newEffects;
};

const createSkillActivity = (
  state: WritableDraft<State>,
  parentId: number | undefined,
  routineId: number | undefined,
  skillInfo: SkillInfo
) => {
  const id = ++activityPathId;

  let damages = createSkillDamages(state, skillInfo);
  let effects = createSkillEffects(state, skillInfo);

  activityPathAdapter.addOne(state.activityPaths, {
    ...defaultActivity,
    id,
    parentId,
    routineId,
    type: activityTypes.SKILL,
    profTrend: skillInfo.proficiency,
    statTrend: skillInfo.abilityScore,
    itemTrend: skillInfo.itemBonus,
    targetType: getSkillTarget(skillInfo),

    damages,
    effects,
  });
  return [id];
};

const createSkillDamages = (
  state: WritableDraft<State>,
  skillInfo: SkillInfo
) => {
  const newDamages: number[] = [];

  if (hasSkillDamage(skillInfo)) {
    let id = ++damageId;
    const skillDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieAdjustments: one,
      diceSize: diceSizes[6],
    };
    newDamages.push(id);
    damageAdapter.addOne(state.damages, skillDamage);
  }

  return newDamages;
};
const createSkillEffects = (
  state: WritableDraft<State>,
  skillInfo: SkillInfo
) => {
  const newEffects: number[] = [];

  for (let { effectCondition, effectType, effectValue } of getSkillEffects(
    skillInfo
  )) {
    let id = ++effectId;
    const skillEffect: Effect = {
      ...defaultEffect,
      id,
      effectCondition,
      effectType,
      effectValue,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, skillEffect);
  }

  return newEffects;
};
const createCantripActivity = (
  state: WritableDraft<State>,
  parentId: number | undefined,
  routineId: number | undefined,
  cantripInfo: CantripInfo
) => {
  const id = ++activityPathId;

  let damages = createCantripDamages(state, cantripInfo);

  activityPathAdapter.addOne(state.activityPaths, {
    ...defaultActivity,
    id,
    parentId,
    routineId,
    profTrend: cantripInfo.proficiency,
    statTrend: cantripInfo.abilityScore,
    ...getCantripTarget(cantripInfo),

    damages,
  });
  return [id];
};

const createCantripDamages = (
  state: WritableDraft<State>,
  cantripInfo: CantripInfo
) => {
  const newDamages: number[] = [];

  let id = ++damageId;
  const cantripDamage: Damage = {
    ...defaultDamage,
    id,
    dieTrend: dieTrends.SPELLLEVEL1,
    damageTrend: [cantripInfo.abilityScore],
    ...getCantripDamage(cantripInfo),
  };
  newDamages.push(id);
  damageAdapter.addOne(state.damages, cantripDamage);

  if (
    cantripInfo.cantrip === "Produce Flame" ||
    cantripInfo.cantrip === "Gouging Claw"
  ) {
    let id = ++damageId;
    const persDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.SPELLLEVEL1,
      persistent: true,
    };
    newDamages.push(id);
    damageAdapter.addOne(state.damages, persDamage);
  }
  return newDamages;
};

const createSpellActivity = (
  state: WritableDraft<State>,
  parentId: number | undefined,
  routineId: number | undefined,
  spellInfo: SpellInfo
) => {
  const id = ++activityPathId;

  let damages = createSpellDamages(state, spellInfo);
  let effects = createSpellEffects(state, spellInfo);

  activityPathAdapter.addOne(state.activityPaths, {
    ...defaultActivity,
    id,
    parentId,
    routineId,
    type: activityTypes.SAVE,
    profTrend: spellInfo.proficiency,
    statTrend: spellInfo.abilityScore,
    ...getSpellTarget(spellInfo),

    damages,
    effects,
  });
  return [id];
};

const createSpellDamages = (
  state: WritableDraft<State>,
  spellInfo: SpellInfo
) => {
  const newDamages: number[] = [];

  if (spellInfo.spell === "Fireball") {
    let id = ++damageId;
    const spellDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.BASIC,
      dieTrend: dieTrends.SPELLLEVEL2,
    };
    newDamages.push(id);
    damageAdapter.addOne(state.damages, spellDamage);
  }
  return newDamages;
};

const createSpellEffects = (
  state: WritableDraft<State>,
  spellInfo: SpellInfo
) => {
  const newEffects: number[] = [];

  if (spellInfo.spell === "Fear") {
    let id = ++effectId;
    const crfa: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.CRIF,
      effectType: effectTypes.FRIGHTENED,
      effectValue: 3,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, crfa);

    id = ++effectId;
    const fail: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.FAIL,
      effectType: effectTypes.FRIGHTENED,
      effectValue: 2,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, fail);

    id = ++effectId;
    const succ: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.SUCC,
      effectType: effectTypes.FRIGHTENED,
      effectValue: 1,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, succ);
  }

  return newEffects;
  // for (let { effectCondition, effectType, effectValue } of getSkillEffects(
  //   skillInfo
  // )) {
  //   let id = ++effectId;
  //   const skillEffect: Effect = {
  //     ...defaultEffect,
  //     id,
  //     effectCondition,
  //     effectType,
  //     effectValue,
  //   };
  //   newEffects.push(id);
  //   effectAdapter.addOne(state.effects, skillEffect);
  // }
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
    const effect = state.effects.entities[eid]!;
    newEffects.push({ ...effect });
  }
  return newEffects;
};

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
    damageAdapter.addOne(state.damages, { ...defaultDamage, ...damage, id });
    newDamages.push(id);
  }
  return newDamages;
};
const insertEffects = (state: WritableDraft<State>, effects: Effect[]) => {
  const newEffects = [];
  for (let effect of effects) {
    // create a new effect entity and add it's id to newEffects
    const id = ++effectId;
    effectAdapter.addOne(state.effects, { ...defaultEffect, ...effect, id });
    newEffects.push(id);
  }
  return newEffects;
};
