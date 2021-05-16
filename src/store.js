import { configureStore } from "@reduxjs/toolkit";
import targetReducer from "./Target/targetSlice";
import routineReducer, { routineAdded } from "./Routine/routineSlice";
import activityPathReducer, {
  activityPathAdded,
} from "./Routine/activityPathSlice";
import activityReducer, { activityAdded } from "./Routine/activitySlice";
import damageReducer, { damageAdded } from "./Routine/damageSlice";
import effectReducer from "./Routine/effectSlice";
import targetInfoReducer, { targetInfoAdded } from "./Routine/targetInfoSlice";
import weaknessReducer, { weaknessAdded } from "./Routine/weaknessSlice";
import {
  activityTypes,
  damageTypes,
  dCond,
  defenses,
  materials,
} from "./types";

export const store = configureStore({
  reducer: {
    routines: routineReducer,
    activityPaths: activityPathReducer,
    activities: activityReducer,
    targetInfos: targetInfoReducer,
    damages: damageReducer,
    effects: effectReducer,
    weaknesses: weaknessReducer,
    target: targetReducer,
  },
});

store.dispatch(routineAdded({ id: 0, name: "tesdt", apId: 0 }));
store.dispatch(
  activityPathAdded({ id: 0, condition: null, activityId: 0, apIds: [] })
);
store.dispatch(weaknessAdded({ id: 0, type: damageTypes.FIRE, value: 10 }));

store.dispatch(
  activityAdded({
    id: 0,
    type: activityTypes.STRIKE,
    targetInfoId: 0,
    value: 10,
    MAP: 0,
    damages: [0, 1],
    effects: [],
  })
);
store.dispatch(
  targetInfoAdded({
    id: 0,
    overrideDefault: true,
    addMods: false,
    type: defenses.AC,
    value: 20,
    weaknesses: [0],
  })
);
store.dispatch(
  damageAdded({
    id: 0,
    condition: dCond.STRIKE,
    diceNum: 1,
    diceSize: 8,
    staticDamage: 6,
    type: damageTypes.B,
    material: materials.COLD_IRON,
    persistent: false,
  })
);
store.dispatch(
  damageAdded({
    id: 1,
    condition: dCond.CRIT,
    diceNum: 0,
    diceSize: 8,
    staticDamage: 10,
    type: damageTypes.FIRE,
    material: materials.NONE,
    persistent: false,
  })
);

export default store;
