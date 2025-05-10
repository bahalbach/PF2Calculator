import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
// @ts-ignore
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
  hasClassPrecisionDamage,
  classPrecisionDamage,
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
  hasBackswing,
  getStrikeName,
  hasActivityCritDamage,
  activityCritDamage,
  getStrikeRoutineName,
  getSkillRoutineName,
  getCantripRoutineName,
  getSpellRoutineName,
  hasSplashDamage,
  getSplashDamage,
  ImpulseInfo,
  getImpulseRoutineName,
  getImpulseDamage,
  getImpulseTarget,
  getImpulsePersistentDamage,
  getImpulseEffects,
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
  Condition,
  MAP,
  ItemTrend,
  DieTrend,
  damageTrends,
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
import { tabCreated, setCurrentTab } from "../../Display/tabSlice";

export const routinesAdapter = createEntityAdapter<Routine>();
export const activityPathAdapter = createEntityAdapter<ActivityPath>();
export const damageAdapter = createEntityAdapter<Damage>();
export const effectAdapter = createEntityAdapter<Effect>();

let routineId = 1;
let activityPathId = 1;
let damageId = 1;
let effectId = 1;

const empty: { [key: number]: number } = {};
const one: { [key: number]: number } = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
  one[i] = 1;
}

const loadState = () => {
  console.log("Loading routine state from local storage");
  try {
    const serializedState = localStorage.getItem("routineState");
    if (serializedState !== null) {
      const state = JSON.parse(serializedState);
      // console.log(state);
      routineId = Math.max(...state.routines.ids);
      activityPathId = Math.max(...state.activityPaths.ids);
      damageId = Math.max(...state.damages.ids);
      effectId = Math.max(...state.effects.ids);
      return state;
    }
    console.log("Routine state not loaded");
    return undefined;
  } catch (err) {
    // ignore errors
    return undefined;
  }
};

// try to load initial state
const savedState = loadState();

const initialState: State = savedState
  ? savedState
  : {
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
  name: "",
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
const defaultStrikeDamage = {
  damageCondition: dCond.STRIKE,

  dieTrend: dieTrends.WEAPON,
  dieAdjustments: { ...empty },
  diceSize: 8,
  fatal: false,
  fatalDie: 10,
  damageTrend: [damageTrends.AS18a, damageTrends.MARTIALWEAPONSPEC],
  damageAdjustments: { ...empty },

  damageType: damageTypes.S,
  material: materials.NONE,
  persistent: false,
  multiplier: 1,
  damageWhen: [whenConditions.Always],
};
const defaultStrikeRuneDamage = {
  damageCondition: dCond.STRIKE,

  dieTrend: dieTrends.RUNE2,
  dieAdjustments: { ...empty },
  diceSize: 6,
  fatal: false,
  fatalDie: 10,
  damageTrend: [],
  damageAdjustments: { ...empty },

  damageType: damageTypes.FIRE,
  material: materials.NONE,
  persistent: false,
  multiplier: 1,
  damageWhen: [whenConditions.Always],
};
const defaultSaveDamage = {
  damageCondition: dCond.BASIC,

  dieTrend: dieTrends.SPELLLEVEL2,
  dieAdjustments: { ...empty },
  diceSize: 6,
  fatal: false,
  fatalDie: 10,
  damageTrend: [],
  damageAdjustments: { ...empty },

  damageType: damageTypes.FIRE,
  material: materials.NONE,
  persistent: false,
  multiplier: 1,
  damageWhen: [whenConditions.Always],
};
const defaultStrikeEffect = {
  effectCondition: conditions.CRIT,
  effectType: effectTypes.FLATFOOT,
  effectValue: 1,
  startLevel: 5,
  endLevel: 20,
  damageWhen: [whenConditions.Always],
};
const defaultStrikeParent = {
  profTrend: profTrends.MARTIALWEAPON,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.WEAPON,
};
const defaultSaveParent = {
  type: activityTypes.SAVE,
  profTrend: profTrends.CASTERSPELL,
  statTrend: statTrends.AS18a,
  targetType: defenses.REF,
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
  effectValue: 1,
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
    routineUpdated: (state, action: PayloadAction<Update<Routine, number>>) => {
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
        action: PayloadAction<{
          id: number;
          copy: boolean;
          tabId: number | undefined;
        }>
      ) => {
        const { id, copy } = action.payload;
        state.parentRoutine = undefined;
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
            name: "",
            display: true,
            apIds: [],
            levelDiff: 0,
            description: "",
            startLevel: 1,
            endLevel: 20,
          });
          state.parentRoutine = id;
        }
        state.selectedRoutine = id;
        state.selectedActivityPath = undefined;
        state.parentActivity = undefined;
      },
      prepare: ({
        copy = false,
        tabId,
      }: {
        copy?: boolean;
        tabId?: number;
      }) => {
        const id = ++routineId;
        return { payload: { id, copy, tabId } };
      },
    },
    routineRemoved: (state, action: PayloadAction<number>) => {
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
        let name = "";
        let description = "";
        if (activityType !== undefined) {
          if (activityType === activityTypes.STRIKE) {
            const damages = [
              createDamage(state, defaultStrikeDamage),
              createDamage(state, defaultStrikeRuneDamage),
            ];
            const effects = [createEffect(state, defaultStrikeEffect)];
            name = "Martial - Strike - d8 Sword";
            ap = {
              ...defaultActivity,
              ...defaultStrikeParent,
              id,
              routineId,
              name,
              damages,
              effects,
            };
            name = "Martial - 1 Strike - d8 Sword";
          }
          if (activityType === activityTypes.SAVE) {
            const damages = [createDamage(state, defaultSaveDamage)];
            name = "Caster - Fireball";
            ap = {
              ...defaultActivity,
              ...defaultSaveParent,
              id,
              routineId,
              name,
              damages,
            };
          }
        } else {
        }

        state.routines.entities[routineId]!.apIds.push(id);
        if (state.routines.entities[routineId]!.name === "") {
          state.routines.entities[routineId]!.name = name;
        }
        if (state.routines.entities[routineId]!.description === "") {
          state.routines.entities[routineId]!.description = description;
        }
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
        impulseInfo?: ImpulseInfo;
      }>
    ) => {
      const { parentActivity: parentId, parentRoutine: routineId } = state;

      const { strikeInfo, skillInfo, cantripInfo, spellInfo, impulseInfo } =
        action.payload;
      let id: number = 0;
      let name = "";
      let description = "";

      if (strikeInfo !== undefined) {
        id = createStrikeActivity(state, parentId, routineId, strikeInfo, 0);
        [name, description] = getStrikeRoutineName(strikeInfo);
      }
      if (skillInfo !== undefined) {
        [name, description] = getSkillRoutineName(skillInfo);
        id = createSkillActivity(state, parentId, routineId, skillInfo);
      }
      if (cantripInfo !== undefined) {
        [name, description] = getCantripRoutineName(cantripInfo);
        id = createCantripActivity(state, parentId, routineId, cantripInfo);
      }
      if (spellInfo !== undefined) {
        [name, description] = getSpellRoutineName(spellInfo);
        id = createSpellActivity(state, parentId, routineId, spellInfo);
      }
      if (impulseInfo !== undefined) {
        [name, description] = getImpulseRoutineName(impulseInfo);
        id = createImpulseActivity(state, parentId, routineId, impulseInfo);
      }

      if (routineId !== undefined) {
        state.routines.entities[routineId]!.apIds.push(id);
        if (state.routines.entities[routineId]!.name === "") {
          state.routines.entities[routineId]!.name = name;
        }
        if (state.routines.entities[routineId]!.description === "") {
          state.routines.entities[routineId]!.description = description;
        }
      }
      if (parentId !== undefined) {
        state.activityPaths.entities[parentId]!.apIds.push(id);
      }

      state.selectedActivityPath = id;
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
    importRoutine: {
      prepare: (routineString: string) => {
        try {
          const routineObject = JSON.parse(routineString);
          if (isRoutineObject(routineObject)) {
            const id = ++routineId;
            return {
              payload: {
                ...routineObject,
                id,
              },
            };
          } else {
            return {
              payload: null,
            };
          }
        } catch (error) {
          return {
            payload: null,
          };
        }
      },
      reducer: (state, action: PayloadAction<null | RoutineObject>) => {
        state.importRoutine = importStates.Importing;
        const routineObject = action.payload;
        if (routineObject !== null) {
          insertRoutine(state, routineObject);
          state.selectedRoutine = routineObject.id;
          state.selectedActivityPath = undefined;
          state.parentActivity = undefined;
          state.parentRoutine = undefined;
          state.importRoutine = importStates.Successful;
        } else {
          state.importRoutine = importStates.Failure;
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tabCreated, (state, action) => {
      state.selectedRoutine = undefined;
      state.selectedActivityPath = undefined;
      state.parentActivity = undefined;
      state.parentRoutine = undefined;
    });
    builder.addCase(setCurrentTab, (state, action) => {
      state.selectedRoutine = undefined;
      state.selectedActivityPath = undefined;
      state.parentActivity = undefined;
      state.parentRoutine = undefined;
    });
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
export const selectSelectedRoutineObject = createSelector(
  (state: RootState) => state.routines.selectedRoutine,
  (state: RootState) => state.routines.routines.entities,
  (state: RootState) => state.routines.activityPaths.entities,
  (selectedRoutine, routines, activityPaths) => {
    if (selectedRoutine !== undefined) {
      const routine = routines[selectedRoutine]!;
      const routineObject = {
        ...routine,
        apIds: routine.apIds.map((id) => activityPaths[id]),
      };
      return routineObject;
    }
    return undefined;
  }
);
export const selectRoutineDescriptions = createSelector(
  (state: RootState) => state.routines.routines.entities,
  (routines) => {
    return Object.values(routines)
      .filter((routine) => routine?.display)
      .map((routine) => routine?.name + ": " + routine?.description);
  }
);

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
  strikeNumber: number,
  previousHits: number = 0,
  condition: Condition = conditions.ALWAYS
) => {
  let useWeapon2 =
    strikeInfo.twf && strikeInfo.isStrikeSecondaryWeapon[strikeNumber];
  if (strikeInfo.twf && strikeInfo.activity === "Double Slice") {
    if (strikeNumber === 0) useWeapon2 = false;
    else useWeapon2 = true;
  }

  const id = ++activityPathId;
  let apIds: number[] = [];
  if (strikeNumber < strikeInfo.numStrikes - 1) {
    if (strikeInfo.activity === "Double Slice") {
      // if the first attack of double slice do no damage, but make 3 child activities for crit, hit, and miss
      const onCrit = createStrikeActivity(
        state,
        id,
        undefined,
        strikeInfo,
        strikeNumber + 1,
        previousHits + 1,
        conditions.CRIT
      );
      const onHit = createStrikeActivity(
        state,
        id,
        undefined,
        strikeInfo,
        strikeNumber + 1,
        previousHits + 1,
        conditions.SUCC
      );
      const onMiss = createStrikeActivity(
        state,
        id,
        undefined,
        strikeInfo,
        strikeNumber + 1,
        previousHits,
        conditions.FAIL_WORSE
      );
      apIds.push(onCrit, onHit, onMiss);
    }
    // need to combine damages for double slice with on miss, onHit, onCrit
    else if (
      strikeInfo.cClass === "Ranger" &&
      strikeInfo.classOption === "Precision Edge"
    ) {
      const onHit = createStrikeActivity(
        state,
        id,
        undefined,
        strikeInfo,
        strikeNumber + 1,
        previousHits + 1,
        conditions.AT_LEAST_SUCC
      );
      const onMiss = createStrikeActivity(
        state,
        id,
        undefined,
        strikeInfo,
        strikeNumber + 1,
        previousHits,
        conditions.FAIL_WORSE
      );
      apIds.push(onHit, onMiss);
    } else {
      apIds.push(
        createStrikeActivity(state, id, undefined, strikeInfo, strikeNumber + 1)
      );
    }
  }
  const name = getStrikeName(strikeInfo, useWeapon2);

  let damages: number[] = [];
  if (strikeInfo.activity === "Double Slice") {
    if (strikeNumber < strikeInfo.numStrikes - 1) {
      damages = [];
    } else {
      damages = createStrikeDamages(
        state,
        strikeInfo,
        strikeNumber,
        useWeapon2,
        previousHits,
        true,
        condition
        // which double slice activity is this? crit/hit/miss
      );
    }
  } else {
    damages = createStrikeDamages(
      state,
      strikeInfo,
      strikeNumber,
      useWeapon2,
      previousHits
    );
  }
  let effects = createStrikeEffects(
    state,
    strikeInfo,
    strikeNumber,
    useWeapon2
  );
  let MAP: MAP = classWeaponMAP(strikeInfo, useWeapon2);
  const effectiveStrikeNumber =
    strikeInfo.numPrevStrikes +
    (strikeInfo.activity === "Double Slice" ? 0 : strikeNumber);
  if (effectiveStrikeNumber === 1) {
    MAP = nextMAPs[MAP];
  } else if (effectiveStrikeNumber >= 2) {
    MAP = nextMAPs[nextMAPs[MAP]];
  }

  let itemTrend: ItemTrend = itemTrends.WEAPON;
  if (
    strikeInfo.classOption === "Bomb Strike" ||
    strikeInfo.classOption === "Bomb w/ feats"
  ) {
    itemTrend = itemTrends.BOMB;
  }
  if (
    strikeInfo.classOption === "Perpetual Bomb" ||
    strikeInfo.classOption === "Perpetual Bomb w/ feats"
  ) {
    itemTrend = itemTrends.BOMB;
  }
  activityPathAdapter.addOne(state.activityPaths, {
    ...defaultActivity,
    id,
    parentId,
    routineId,
    condition,
    name,
    type: activityTypes.STRIKE,
    profTrend: classWeaponProf(strikeInfo.cClass, strikeInfo.classOption),
    statTrend: strikeInfo.attackScore,
    itemTrend,
    bonusAdjustments: classAdjustments(strikeInfo, strikeNumber),
    MAP,

    damages,
    effects,
    apIds,
  });
  return id;
};
const createStrikeDamages = (
  state: WritableDraft<State>,
  strikeInfo: StrikeInfo,
  strikeNumber: number,
  useWeapon2: boolean = false,
  previousHits: number = 0,
  addDoubleSliceDamage: boolean = false,
  doubleSliceCondition: Condition = conditions.FAIL_WORSE
) => {
  let weapon = useWeapon2 ? strikeInfo.weapon2 : strikeInfo.weapon1;
  const newDamages: number[] = [];

  if (addDoubleSliceDamage) {
    let weapon = strikeInfo.weapon1;
    // use the first weapon for this damage always
    if (doubleSliceCondition === conditions.CRIT) {
      // add all damage as if crit... always
      let id = ++damageId;
      let dieTrend: DieTrend = dieTrends.WEAPON;
      if (
        strikeInfo.classOption === "Bomb Strike" ||
        strikeInfo.classOption === "Bomb w/ feats"
      ) {
        dieTrend = dieTrends.BOMB;
      }
      if (
        strikeInfo.classOption === "Perpetual Bomb" ||
        strikeInfo.classOption === "Perpetual Bomb w/ feats"
      ) {
        dieTrend = dieTrends.BOMB;
      }
      const weaponDamage: Damage = {
        ...defaultDamage,
        damageCondition: dCond.ALWAYS,
        multiplier: 2,
        id,
        dieTrend,
        dieAdjustments: activityWeaponDiceAdjustments(strikeInfo),
        diceSize: hasFatal(strikeInfo) ? weapon.fatalSize : weapon.dieSize,
        fatal: hasFatal(strikeInfo),
        fatalDie: weapon.fatalSize,
        damageTrend: classWeaponDamageTrends(strikeInfo, strikeNumber - 1),
        damageAdjustments: classDamageAdjustments(strikeInfo),
      };
      damageAdapter.addOne(state.damages, weaponDamage);
      newDamages.push(id);

      if (
        !(
          strikeInfo.cClass === "Alchemist" &&
          strikeInfo.classOption !== "Normal"
        )
      ) {
        id = ++damageId;
        const runeDamage: Damage = {
          ...defaultDamage,
          damageCondition: dCond.ALWAYS,
          multiplier: 2,
          id,
          dieTrend: weapon.runes,
          diceSize: diceSizes[6],
          damageType: damageTypes.FIRE,
        };
        damageAdapter.addOne(state.damages, runeDamage);
        newDamages.push(id);
      }

      if (hasClassPrecisionDamage(strikeInfo, previousHits)) {
        let { dieTrend, diceSize, damageWhen, damageTrend } =
          classPrecisionDamage(strikeInfo, previousHits);
        id = ++damageId;
        const classDamage: Damage = {
          ...defaultDamage,
          damageCondition: dCond.ALWAYS,
          multiplier: 2,
          id,
          dieTrend,
          diceSize,
          damageType: damageTypes.PRECISION,
          damageWhen,
          damageTrend,
        };
        damageAdapter.addOne(state.damages, classDamage);
        newDamages.push(id);
      }

      if (hasDeadly(strikeInfo)) {
        let damageAdjustments = empty;
        if (!hasFatal(strikeInfo) && hasPickCritSpec(strikeInfo))
          damageAdjustments = critSpecDamage(strikeInfo);
        id = ++damageId;
        const critDamage: Damage = {
          ...defaultDamage,
          damageCondition: dCond.ALWAYS,
          id,
          dieTrend: dieTrends.DEADLY,
          diceSize: weapon.deadlySize,
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
          damageCondition: dCond.ALWAYS,
          id,
          dieAdjustments: one,
          diceSize: weapon.fatalSize,
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
          damageCondition: dCond.ALWAYS,
          id,
          diceSize: weapon.fatalSize,
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
          damageCondition: dCond.ALWAYS,
          id,
          dieAdjustments: critSpecDice(strikeInfo),
          diceSize: diceSizes[6],
          damageAdjustments,
          persistent: true,
        };
        damageAdapter.addOne(state.damages, critDamage);
        newDamages.push(id);
      }
    } else if (doubleSliceCondition === conditions.SUCC) {
      // add hit damage always, add precision damage only on miss so we don't add it twice with the second attack
      let id = ++damageId;
      let dieTrend: DieTrend = dieTrends.WEAPON;
      if (
        strikeInfo.classOption === "Bomb Strike" ||
        strikeInfo.classOption === "Bomb w/ feats"
      ) {
        dieTrend = dieTrends.BOMB;
      }
      if (
        strikeInfo.classOption === "Perpetual Bomb" ||
        strikeInfo.classOption === "Perpetual Bomb w/ feats"
      ) {
        dieTrend = dieTrends.BOMB;
      }
      const weaponDamage: Damage = {
        ...defaultDamage,
        damageCondition: dCond.ALWAYS,
        id,
        dieTrend,
        dieAdjustments: activityWeaponDiceAdjustments(strikeInfo),
        diceSize: weapon.dieSize,
        fatal: false,
        fatalDie: weapon.fatalSize,
        damageTrend: classWeaponDamageTrends(strikeInfo, strikeNumber - 1),
        damageAdjustments: classDamageAdjustments(strikeInfo),
      };
      damageAdapter.addOne(state.damages, weaponDamage);
      newDamages.push(id);

      if (
        !(
          strikeInfo.cClass === "Alchemist" &&
          strikeInfo.classOption !== "Normal"
        )
      ) {
        id = ++damageId;
        const runeDamage: Damage = {
          ...defaultDamage,
          damageCondition: dCond.ALWAYS,
          id,
          dieTrend: weapon.runes,
          diceSize: diceSizes[6],
          damageType: damageTypes.FIRE,
        };
        damageAdapter.addOne(state.damages, runeDamage);
        newDamages.push(id);
      }

      if (hasClassPrecisionDamage(strikeInfo, previousHits)) {
        let { dieTrend, diceSize, damageWhen, damageTrend } =
          classPrecisionDamage(strikeInfo, previousHits);
        id = ++damageId;
        const classDamage: Damage = {
          ...defaultDamage,
          damageCondition: dCond.FAIL_WORSE,
          id,
          dieTrend,
          diceSize,
          damageType: damageTypes.PRECISION,
          damageWhen,
          damageTrend,
        };
        damageAdapter.addOne(state.damages, classDamage);
        newDamages.push(id);
      }
    }
  }

  let id = ++damageId;
  let dieTrend: DieTrend = dieTrends.WEAPON;
  if (
    strikeInfo.classOption === "Bomb Strike" ||
    strikeInfo.classOption === "Bomb w/ feats"
  ) {
    dieTrend = dieTrends.BOMB;
  }
  if (
    strikeInfo.classOption === "Perpetual Bomb" ||
    strikeInfo.classOption === "Perpetual Bomb w/ feats"
  ) {
    dieTrend = dieTrends.BOMB;
  }
  const weaponDamage: Damage = {
    ...defaultDamage,
    id,
    dieTrend,
    dieAdjustments: activityWeaponDiceAdjustments(strikeInfo),
    diceSize: weapon.dieSize,
    fatal: hasFatal(strikeInfo, useWeapon2),
    fatalDie: weapon.fatalSize,
    damageTrend: classWeaponDamageTrends(strikeInfo, strikeNumber, useWeapon2),
    damageAdjustments: classDamageAdjustments(strikeInfo, useWeapon2),
  };
  damageAdapter.addOne(state.damages, weaponDamage);
  newDamages.push(id);

  if (
    !(strikeInfo.cClass === "Alchemist" && strikeInfo.classOption !== "Normal")
  ) {
    id = ++damageId;
    const runeDamage: Damage = {
      ...defaultDamage,
      id,
      dieTrend: weapon.runes,
      diceSize: diceSizes[6],
      damageType: damageTypes.FIRE,
    };
    damageAdapter.addOne(state.damages, runeDamage);
    newDamages.push(id);
  }

  if (
    !(addDoubleSliceDamage && doubleSliceCondition === conditions.CRIT) &&
    hasClassPrecisionDamage(strikeInfo, previousHits)
  ) {
    let { dieTrend, diceSize, damageWhen, damageTrend } = classPrecisionDamage(
      strikeInfo,
      previousHits
    );
    id = ++damageId;
    const classDamage: Damage = {
      ...defaultDamage,
      id,
      dieTrend,
      diceSize,
      damageTrend,
      damageType: damageTypes.PRECISION,
      damageWhen,
    };
    damageAdapter.addOne(state.damages, classDamage);
    newDamages.push(id);
  }

  if (hasActivityDamageDice(strikeInfo)) {
    id = ++damageId;
    const activityDamage: Damage = {
      ...defaultDamage,
      id,
      ...activityDamageDice(strikeInfo),
    };
    damageAdapter.addOne(state.damages, activityDamage);
    newDamages.push(id);
  }
  if (hasActivityCritDamage(strikeInfo)) {
    id = ++damageId;
    const activityDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      ...activityCritDamage(strikeInfo),
    };
    damageAdapter.addOne(state.damages, activityDamage);
    newDamages.push(id);
  }
  if (hasSplashDamage(strikeInfo)) {
    id = ++damageId;
    const splashDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.AT_LEAST_FAIL,
      ...getSplashDamage(strikeInfo),
    };
    damageAdapter.addOne(state.damages, splashDamage);
    newDamages.push(id);
  }

  if (hasDeadly(strikeInfo, useWeapon2)) {
    let damageAdjustments = empty;
    if (
      !hasFatal(strikeInfo, useWeapon2) &&
      hasPickCritSpec(strikeInfo, useWeapon2)
    )
      damageAdjustments = critSpecDamage(strikeInfo, useWeapon2);
    id = ++damageId;
    const critDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieTrend: dieTrends.DEADLY,
      diceSize: weapon.deadlySize,
      damageAdjustments,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (hasFatal(strikeInfo, useWeapon2)) {
    let damageAdjustments = empty;
    if (hasPickCritSpec(strikeInfo, useWeapon2))
      damageAdjustments = critSpecDamage(strikeInfo, useWeapon2);
    id = ++damageId;
    const critDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieAdjustments: one,
      diceSize: weapon.fatalSize,
      damageAdjustments,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (
    !hasDeadly(strikeInfo, useWeapon2) &&
    !hasFatal(strikeInfo, useWeapon2) &&
    hasPickCritSpec(strikeInfo, useWeapon2)
  ) {
    let damageAdjustments = critSpecDamage(strikeInfo, useWeapon2);
    id = ++damageId;
    const critDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      diceSize: weapon.fatalSize,
      damageAdjustments,
    };
    damageAdapter.addOne(state.damages, critDamage);
    newDamages.push(id);
  }
  if (hasKnifeCritSpec(strikeInfo, useWeapon2)) {
    let damageAdjustments = critSpecDamage(strikeInfo, useWeapon2);
    id = ++damageId;
    const critDamage: Damage = {
      ...defaultDamage,
      id,
      damageCondition: dCond.CRIT,
      dieAdjustments: critSpecDice(strikeInfo, useWeapon2),
      diceSize: diceSizes[6],
      damageType: damageTypes.BLEED,
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
  strikeNumber: number,
  useWeapon2: boolean = false
) => {
  let weapon = useWeapon2 ? strikeInfo.weapon2 : strikeInfo.weapon1;

  const newEffects: number[] = [];
  let id;

  if (hasCritSpecEffect(strikeInfo, useWeapon2)) {
    let effectType: EffectType = effectStateTypes.FLATFOOT;
    if (hasSwordCritSpec(strikeInfo, useWeapon2))
      effectType = effectStateTypes.FLATFOOT;
    if (hasHammerCritSpec(strikeInfo, useWeapon2))
      effectType = effectStateTypes.PRONE;
    if (hasSpearCritSpec(strikeInfo, useWeapon2))
      effectType = effectValueTypes.CLUMSY;

    id = ++effectId;
    const critSpecEffect: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.CRIT,
      effectType,
      effectValue: 1,
      startLevel: weapon.critSpecLevel,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, critSpecEffect);
  }
  if (hasBackswing(strikeInfo, useWeapon2)) {
    id = ++effectId;
    const backswingEffect: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.FAIL_WORSE,
      effectType: effectValueTypes.BONUSC1,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, backswingEffect);
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
    name: skillInfo.skillActivity,
    type: activityTypes.SKILL,
    profTrend: skillInfo.proficiency,
    statTrend: skillInfo.abilityScore,
    itemTrend: skillInfo.itemBonus,
    targetType: getSkillTarget(skillInfo),

    damages,
    effects,
  });
  return id;
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
    name: cantripInfo.cantrip,
    profTrend: cantripInfo.proficiency,
    statTrend: cantripInfo.abilityScore,
    ...getCantripTarget(cantripInfo),

    damages,
  });
  return id;
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
      diceSize: diceSizes[4],
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
    name: spellInfo.spell,
    type: activityTypes.SAVE,
    profTrend: spellInfo.proficiency,
    statTrend: spellInfo.abilityScore,
    ...getSpellTarget(spellInfo),

    damages,
    effects,
  });
  return id;
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
  } else if (spellInfo.spell === "Heroism") {
    let id = ++effectId;
    const e3: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.ALWAYS,
      effectType: effectTypes.BONUSSA,
      effectValue: 1,
      startLevel: 5,
      endLevel: 10,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, e3);

    id = ++effectId;
    const e6: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.ALWAYS,
      effectType: effectTypes.BONUSSA,
      effectValue: 1,
      startLevel: 11,
      endLevel: 16,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, e6);

    id = ++effectId;
    const e9: Effect = {
      ...defaultEffect,
      id,
      effectCondition: conditions.ALWAYS,
      effectType: effectTypes.BONUSSA,
      effectValue: 1,
      startLevel: 17,
      endLevel: 20,
    };
    newEffects.push(id);
    effectAdapter.addOne(state.effects, e9);
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

const createImpulseActivity = (
  state: WritableDraft<State>,
  parentId: number | undefined,
  routineId: number | undefined,
  impulseInfo: ImpulseInfo
) => {
  const id = ++activityPathId;

  let damages = createImpulseDamages(state, impulseInfo);
  let effects = createImpulseEffects(state, impulseInfo);
  const target = getImpulseTarget(impulseInfo);
  const itemTrend =
    target.type === activityTypes.SAVE
      ? itemTrends.NONE
      : itemTrends.Gate_Attenuator;

  activityPathAdapter.addOne(state.activityPaths, {
    ...defaultActivity,
    id,
    parentId,
    routineId,
    name: impulseInfo.impulse,
    profTrend: impulseInfo.proficiency,
    statTrend: impulseInfo.abilityScore,
    itemTrend,
    MAP: impulseInfo.weaponInfo.traits["agile"] ? MAPs.A1 : MAPs.N1,
    ...target,
    damages,
    effects,
  });
  return id;
};

const createImpulseDamages = (
  state: WritableDraft<State>,
  impulseInfo: ImpulseInfo
) => {
  const newDamages: number[] = [];

  let id = ++damageId;
  const impulseDamage: Damage = {
    ...defaultDamage,
    id,
    ...getImpulseDamage(impulseInfo),
  };
  newDamages.push(id);
  damageAdapter.addOne(state.damages, impulseDamage);

  const impulsePersistentDamage = getImpulsePersistentDamage(impulseInfo);
  if (impulsePersistentDamage) {
    id = ++damageId;
    const persistentDamage: Damage = {
      ...defaultDamage,
      id,
      ...impulsePersistentDamage,
      persistent: true,
    };
    newDamages.push(id);
    damageAdapter.addOne(state.damages, persistentDamage);
  }

  return newDamages;
};
const createImpulseEffects = (
  state: WritableDraft<State>,
  impulseInfo: ImpulseInfo
) => {
  const newEffects: number[] = [];

  for (let { effectCondition, effectType, effectValue } of getImpulseEffects(
    impulseInfo
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
const createDamage = (
  state: WritableDraft<State>,
  damage: Omit<Damage, "id">
) => {
  const id = ++damageId;
  damageAdapter.addOne(state.damages, { ...damage, id });
  return id;
};
const copyDamages = (state: WritableDraft<State>, damages: number[]) => {
  const newDamages = [];
  for (let did of damages) {
    let damage = state.damages.entities[did]!;
    // create a new damage entity and add it's id to newDamages
    const id = createDamage(state, damage);
    newDamages.push(id);
  }
  return newDamages;
};
const createEffect = (
  state: WritableDraft<State>,
  effect: Omit<Effect, "id">
) => {
  const id = ++effectId;
  effectAdapter.addOne(state.effects, { ...effect, id });
  return id;
};
const copyEffects = (state: WritableDraft<State>, effects: number[]) => {
  const newEffects = [];
  for (let eid of effects) {
    let effect = state.effects.entities[eid]!;
    // create a new effect entity and add it's id to newEffects
    const id = createEffect(state, effect);
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
  const id = routine.id;
  const apIds = insertActivityPaths(state, routine.apIds, undefined, id);
  routinesAdapter.addOne(state.routines, { ...routine, apIds });
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

    if (ap.name === undefined) ap.name = "";
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
