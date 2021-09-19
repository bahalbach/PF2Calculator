import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
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
} from "../Model/types";
import { damageTypes, dCond, dieTrends, materials } from "../Model/types";

export const routinesAdapter = createEntityAdapter();
export const activityPathAdapter = createEntityAdapter();
export const damageAdapter = createEntityAdapter();
export const effectAdapter = createEntityAdapter();

let routineId = 100;
let activityPathId = 1000;
let damageId = 1000;
let effectId = 1000;

const empty = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
}
const defaultParentActivity = {
  rollType: rollTypes.NORMAL,
  type: activityTypes.STRIKE,
  profTrend: profTrends.MARTIALWEAPON,
  statTrend: statTrends.AS18a,
  itemTrend: itemTrends.WEAPON,
  bonusAdjustments: { ...empty },
  MAP: MAPs.N1,
  targetType: defenses.AC,

  damages: [],
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

const removeActivityPaths = (state, ids) => {
  let index = 0;
  while (index < ids.length) {
    let ap = state.activityPaths.entities[ids[index]];
    ids.push(...ap.apIds);
    damageAdapter.removeMany(state.damages, ap.damages);
    effectAdapter.removeMany(state.effects, ap.effects);
    activityPathAdapter.removeOne(state.activityPaths, ap.id);
    index += 1;
  }
};
const copyDamages = (state, damages) => {
  const newDamages = [];
  for (let did of damages) {
    let damage = state.damages.entities[did];
    // create a new damage entity and add it's id to newDamages
    const id = ++damageId;
    damageAdapter.addOne(state.damages, { ...damage, id });
    newDamages.push(id);
  }
  return newDamages;
};
const copyEffects = (state, effects) => {
  const newEffects = [];
  for (let eid of effects) {
    let effect = state.effects.entities[eid];
    // create a new effect entity and add it's id to newEffects
    const id = ++effectId;
    effectAdapter.addOne(state.effects, { ...effect, id });
    newEffects.push(id);
  }
  return newEffects;
};

export const routinesSlice = createSlice({
  name: "routines",
  initialState: {
    selectedRoutine: 0,
    routines: routinesAdapter.getInitialState(),
    activityPaths: activityPathAdapter.getInitialState(),
    damages: damageAdapter.getInitialState(),
    effects: effectAdapter.getInitialState(),
  },
  reducers: {
    setRoutine: (state, action) => {
      state.selectedRoutine = action.payload || 0;
    },

    routineAdded: (state, action) => {
      routinesAdapter.addOne(state.routines, action);
    },
    routineUpdated: (state, action) => {
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
      reducer: (state, action) => {
        const { id } = action.payload;
        state.selectedRoutine = id;
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
      },
      prepare: () => {
        const id = ++routineId;
        return { payload: { id } };
      },
    },
    routineRemoved: (state, action) => {
      // recursively remove all children
      const routineId = action.payload;
      let childrenIds = state.routines.entities[routineId].apIds;
      removeActivityPaths(state, childrenIds);

      routinesAdapter.removeOne(state.routines, routineId);
      if (routineId === state.selectedRoutine)
        state.selectedRoutine = state.routines.ids
          ? state.routines.ids[0]
          : undefined;
    },
    activityPathCreated: {
      reducer: (state, action) => {
        const { id, parentId, routineId, applyMAP } = action.payload;

        let parentAP;
        if (routineId !== undefined)
          state.routines.entities[routineId].apIds.push(id);
        if (parentId !== undefined) {
          state.activityPaths.entities[parentId].apIds.push(id);
          parentAP = state.activityPaths.entities[parentId];
        } else {
          parentAP = defaultParentActivity;
        }
        // copy parent damages and effects
        let newDamages = copyDamages(state, parentAP.damages);
        let newEffects = copyEffects(state, parentAP.effects);

        activityPathAdapter.addOne(state.activityPaths, {
          id,
          condition: conditions.ALWAYS,

          rollType: rollTypes.NORMAL,
          type: activityTypes.STRIKE,
          profTrend: parentAP.profTrend,
          statTrend: parentAP.statTrend,
          itemTrend: parentAP.itemTrend,
          bonusAdjustments: { ...parentAP.bonusAdjustments },
          MAP: applyMAP ? nextMAPs[parentAP.MAP] : parentAP.MAP,

          targetType: defenses.AC,

          damages: newDamages,
          effects: newEffects,
          apIds: [],
        });
      },
      prepare: ({ parentId, routineId, applyMAP }) => {
        const id = ++activityPathId;
        return {
          payload: {
            id,
            parentId,
            routineId,
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
        state.activityPaths.entities[parentId].apIds =
          state.activityPaths.entities[parentId].apIds.filter(
            (apId) => apId !== id
          );
      }
      if (routineId !== undefined) {
        state.routines.entities[routineId].apIds = state.routines.entities[
          routineId
        ].apIds.filter((apId) => apId !== id);
      }
    },

    damageCreated: {
      reducer: (state, action) => {
        const { id, parentId } = action.payload;
        state.activityPaths.entities[parentId].damages.push(id);
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
    damageRemoved: (state, action) => {
      const { id, parentId } = action.payload;
      state.activityPaths.entities[parentId].damages =
        state.activityPaths.entities[parentId].damages.filter(
          (did) => did !== id
        );
      damageAdapter.removeOne(state.damages, id);
    },
    effectCreated: {
      reducer: (state, action) => {
        const { id, parentId } = action.payload;
        state.activityPaths.entities[parentId].effects.push(id);
        effectAdapter.addOne(state.effects, {
          id,
          effectCondition: conditions.ALWAYS,
          effectType: effectTypes.FLATFOOT,
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
      state.activityPaths.entities[parentId].effects =
        state.activityPaths.entities[parentId].effects.filter(
          (eid) => eid !== id
        );
      effectAdapter.removeOne(state.effects, id);
    },
  },
});

export const {
  setRoutine,

  routineAdded,
  routineUpdated,
  routineCreated,
  routineRemoved,

  activityPathAdded,
  activityPathUpdated,
  activityPathCreated,
  activityPathRemoved,

  damageAdded,
  damageUpdated,
  damageCreated,
  damageRemoved,

  effectAdded,
  effectUpdated,
  effectCreated,
  effectRemoved,
} = routinesSlice.actions;

export default routinesSlice.reducer;

export const {
  selectById: selectRoutineById,
  selectIds: selectRoutineIds,
  selectEntities: selectRoutineEntities,
  selectAll: selectAllRoutines,
  selectTotal: selectTotalRoutines,
} = routinesAdapter.getSelectors((state) => state.routines.routines);

export const {
  selectById: selectactivityPathById,
  selectIds: selectactivityPathIds,
  selectEntities: selectactivityPathEntities,
  selectAll: selectAllactivityPaths,
  selectTotal: selectTotalactivityPaths,
} = activityPathAdapter.getSelectors((state) => state.routines.activityPaths);

export const {
  selectById: selectdamageById,
  selectIds: selectdamageIds,
  selectEntities: selectdamageEntities,
  selectAll: selectAlldamages,
  selectTotal: selectTotaldamages,
} = damageAdapter.getSelectors((state) => state.routines.damages);

export const {
  selectById: selecteffectById,
  selectIds: selecteffectIds,
  selectEntities: selecteffectEntities,
  selectAll: selectAlleffects,
  selectTotal: selectTotaleffects,
} = effectAdapter.getSelectors((state) => state.routines.effects);

export const selectSelectedRoutine = (state) => state.routines.selectedRoutine;
