import { configureStore } from "@reduxjs/toolkit";
import routineReducer, {
  damageAdded,
  effectAdded,
  importRoutine,
  routineAdded,
  setRoutine,
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
  HPTrends,
  materials,
  SaveTrends,
  whenConditions,
} from "../Model/types";
import { exampleRoutines } from "../Model/exampleRoutines";

const empty: { [key: number]: number } = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
}

const makeStore = () => {
  const store = configureStore({
    reducer: {
      routines: routineReducer,
      weaknesses: weaknessReducer,
      targets: targetReducer,
      sharing: sharingReducer,
    },
  });

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
      HPTrend: HPTrends.MODERATE,
      percentHP: 100,

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
      overrideHP: 20,
      currentHP: 20,
    })
  );

  // default damages and effects
  try {
    if (localStorage.getItem("routineState") === null) {
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

      store.dispatch(setRoutine(2));
      // set the first routine you see to be Fighter - 2 Strike - d12 Sword
    }
  } catch {
    // ignore errors
  }
  return store;
};
export { makeStore };
const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
