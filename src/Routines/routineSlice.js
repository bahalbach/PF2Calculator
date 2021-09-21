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
  damageTrends,
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
const copyActivityPaths = (state, apIds) => {
  let newApIds = [];
  for (let apId of apIds) {
    const ap = state.activityPaths.entities[apId];
    const apIds = copyActivityPaths(state, ap.apIds);
    const damages = copyDamages(state, ap.damages);
    const effects = copyEffects(state, ap.effects);
    const id = ++activityPathId;
    activityPathAdapter.addOne(state.activityPaths, {
      ...ap,
      id,
      damages,
      effects,
      apIds,
    });
    newApIds.push(id);
  }
  return newApIds;
};
const getActivityPaths = (state, apIds) => {
  let newAps = [];
  for (let apId of apIds) {
    const ap = state.activityPaths.entities[apId];
    const aps = getActivityPaths(state, ap.apIds);
    const damages = getDamages(state, ap.damages);
    const effects = getEffects(state, ap.effects);
    newAps.push({ ...ap, apIds: aps, damages, effects });
  }
  return newAps;
};
const getDamages = (state, damages) => {
  let newDamages = [];
  for (let did of damages) {
    const damage = state.damages.entities[did];
    newDamages.push({ ...damage });
  }
  return newDamages;
};
const getEffects = (state, effects) => {
  let newEffects = [];
  for (let eid of effects) {
    const damage = state.effects.entities[eid];
    newEffects.push({ ...damage });
  }
  return newEffects;
};

const validateRoutine = (routine) => {
  return (
    typeof routine.name === "string" &&
    typeof routine.display === "boolean" &&
    typeof routine.levelDiff === "number" &&
    typeof routine.description === "string" &&
    validateActivityPaths(routine.apIds) &&
    typeof routine.startLevel === "number" &&
    typeof routine.endLevel === "number"
  );
};
const validateActivityPaths = (apIds) => {
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
          validateAdjustments(apId.bonusAdjustments) &&
          Object.values(MAPs).includes(apId.MAP) &&
          Object.values(defenses).includes(apId.targetType) &&
          validateActivityPaths(apId.apIds) &&
          validateDamages(apId.damages) &&
          validateEffects(apId.effects)
        )
      ) {
        console.log(apId);
        return false;
      }
    }
    return true;
  }
  return false;
};
const validateAdjustments = (adjustments) => {
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
};
const validateDamages = (damages) => {
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
          validateAdjustments(damage.dieAdjustments) &&
          typeof damage.diceSize === "number" &&
          typeof damage.fatal === "boolean" &&
          typeof damage.fatalDie === "number" &&
          validateAdjustments(damage.damageAdjustments) &&
          Object.values(damageTypes).includes(damage.damageType) &&
          Object.values(materials).includes(damage.material) &&
          typeof damage.persistent === "boolean" &&
          damage.multiplier in [0.5, 1, 2]
        )
      ) {
        console.log(damage);
        return false;
      }
    }
    return true;
  }
};
const validateEffects = (effects) => {
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
};
const insertRoutine = (state, routine) => {
  const apIds = insertActivityPaths(state, routine.apIds);
  const id = ++routineId;
  routinesAdapter.addOne(state.routines, { ...routine, id, apIds });
  return id;
};
const insertActivityPaths = (state, aps) => {
  let newApIds = [];
  for (let ap of aps) {
    const apIds = insertActivityPaths(state, ap.apIds);
    const damages = insertDamages(state, ap.damages);
    const effects = insertEffects(state, ap.effects);
    const id = ++activityPathId;
    activityPathAdapter.addOne(state.activityPaths, {
      ...ap,
      id,
      damages,
      effects,
      apIds,
    });
    newApIds.push(id);
  }
  return newApIds;
};
const insertDamages = (state, damages) => {
  const newDamages = [];
  for (let damage of damages) {
    // create a new damage entity and add it's id to newDamages
    const id = ++damageId;
    damageAdapter.addOne(state.damages, { ...damage, id });
    newDamages.push(id);
  }
  return newDamages;
};
const insertEffects = (state, effects) => {
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
// }

export const routinesSlice = createSlice({
  name: "routines",
  initialState: {
    selectedRoutine: 1,
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
        const { id, copy } = action.payload;
        if (copy) {
          const routine = state.routines.entities[state.selectedRoutine];
          const name = "Copy of " + routine.name;
          const apIds = copyActivityPaths(state, routine.apIds);
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
      },
      prepare: ({ copy = false }) => {
        const id = ++routineId;
        return { payload: { id, copy } };
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
        const { id, parentId, routineId, isStrike, applyMAP } = action.payload;

        let parentAP;
        if (routineId !== undefined)
          state.routines.entities[routineId].apIds.push(id);
        if (parentId !== undefined) {
          state.activityPaths.entities[parentId].apIds.push(id);
          parentAP = state.activityPaths.entities[parentId];
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
    importRoutine: (state, action) => {
      try {
        // console.log(action.payload);
        const routineObject = JSON.parse(action.payload);
        // console.log("parsed");
        // console.log(routineObject);
        // console.log(validateRoutine(routineObject));
        if (validateRoutine(routineObject)) {
          state.selectedRoutine = insertRoutine(state, routineObject);
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

  importRoutine,
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
export const selectSelectedRoutineObject = (state) => {
  let routine = {
    ...state.routines.routines.entities[state.routines.selectedRoutine],
  };
  routine.apIds = getActivityPaths(state.routines, routine.apIds);
  // routine.name = "test";
  return routine;
};
