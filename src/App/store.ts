import { configureStore } from "@reduxjs/toolkit";
import routineReducer, {
  damageAdded,
  effectAdded,
  importRoutine,
  routineAdded,
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
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
}

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

// default damages and effects
try {
  if (localStorage.getItem("routineState") === null) {
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
  }
} catch {
  // ignore errors
}

export default store;
