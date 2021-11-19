import { configureStore } from "@reduxjs/toolkit";
import routineReducer, {
  damageAdded,
  effectAdded,
  importRoutine,
  routineAdded,
  routineCreated,
} from "../Routines/RoutineSlice/routineSlice";
import targetReducer, { targetAdded } from "../Display/targetSlice";
import sharingReducer from "../Display/sharingSlice";
import weaknessReducer from "../Display/weaknessSlice";
import {
  ACTrends,
  conditions,
  damageTrends,
  damageTypes,
  dCond,
  dieTrends,
  effectTypes,
  graphTypes,
  materials,
  SaveTrends,
  whenConditions,
} from "../Model/types";
import { exampleRoutines } from "../Model/exampleRoutines";

const empty: { [key: number]: number } = {};
const pickCritSpec: { [key: number]: number } = {};
const one: { [key: number]: number } = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
  one[i] = 1;
  pickCritSpec[i] = 0;
  if (i >= 5) {
    pickCritSpec[i] = 4;
  }
  if (i >= 12) {
    pickCritSpec[i] = 6;
  }
  if (i >= 19) {
    pickCritSpec[i] = 8;
  }
}

// const activityPathRemoved = createAction(
//   "RemoveActivityPath",
//   (id, parentId) => ({ payload: { id, parentId } })
// );
// const globalReducer = createReducer(, (builder) => {
//   builder.addCase(activityPathRemoved, (state, action) => {
//     const { id, parentId } = action.payload;
//     // activityPathAdapter.removeMany(state, state.entities[id].apIds);
//     activityPathAdapter.removeOne(state, id);
//     if (parentId !== undefined) {
//       state.entities[parentId].apIds = state.entities[parentId].apIds.filter(
//         (apId) => apId !== id
//       );
//     }
//   });
// });

export const store = configureStore({
  reducer: {
    routines: routineReducer,
    weaknesses: weaknessReducer,
    targets: targetReducer,
    sharing: sharingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// default damages and effects
store.dispatch(
  damageAdded({
    id: 0,
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
  })
);
store.dispatch(
  damageAdded({
    id: 1,
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
  })
);
store.dispatch(
  damageAdded({
    id: 2,
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
  })
);
store.dispatch(
  effectAdded({
    id: 0,
    effectCondition: conditions.CRIT,
    effectType: effectTypes.FLATFOOT,
    effectValue: 1,
    startLevel: 5,
    endLevel: 20,
    damageWhen: [whenConditions.Always],
  })
);

store.dispatch(
  targetAdded({
    id: 0,
    name: "AC: High, Saves: Moderate",

    levelDiff: 0,
    persistentMultiplier: 2,

    ACTrend: ACTrends.HIGH,
    FortTrend: SaveTrends.MODERATE,
    RefTrend: SaveTrends.MODERATE,
    WillTrend: SaveTrends.MODERATE,
    PerTrend: SaveTrends.MODERATE,

    flatfooted: false,
    percentSelectedRoutine: false,
    weaknesses: [],

    graphType: graphTypes.DISTRIBUTION,
    routineLevel: 1,
    targetLevel: 1,
    overrideAC: 16,
    overrideFort: 7,
    overrideRef: 7,
    overrideWill: 7,
    overridePer: 7,
  })
);

// add in some example routines
store.dispatch(
  routineAdded({
    id: 0,
    name: "Baseline",
    display: true,
    apIds: [],
    levelDiff: 0,
    description: "No damage. Just so graphs display 0 with autoscalling.",
    startLevel: 1,
    endLevel: 20,
  })
);

for (let r of exampleRoutines) {
  store.dispatch(importRoutine(r));
}

store.dispatch(routineCreated({}));
// window.location.href = "#create-new-activity";
// store.dispatch(weaknessAdded({ id: 0, type: damageTypes.FIRE, value: 10 }));
// store.dispatch(
//   damageAdded({
//     id: 0,
//     damageCondition: dCond.STRIKE,
//     diceNum: 1,
//     diceSize: 8,
//     staticDamage: 4,
//     damageType: damageTypes.B,
//     material: materials.COLD_IRON,
//     persistent: false,
//   })
// );

export default store;
