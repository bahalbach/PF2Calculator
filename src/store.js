import { configureStore } from "@reduxjs/toolkit";
import routineReducer, { routineAdded } from "./Routine/routineSlice";
import activityPathReducer, {
  activityPathAdded,
} from "./Routine/activityPathSlice";
import damageReducer, { damageAdded } from "./Routine/damageSlice";
import effectReducer from "./Routine/effectSlice";
import targetReducer, { targetAdded } from "./Target/targetSlice";
import weaknessReducer, { weaknessAdded } from "./Target/weaknessSlice";
import {
  activityTypes,
  conditions,
  damageTypes,
  dCond,
  defaultValuesAC,
  defaultValuesSaves,
  defenses,
  MAPs,
  materials,
} from "./types";

export const store = configureStore({
  reducer: {
    routines: routineReducer,
    activityPaths: activityPathReducer,
    damages: damageReducer,
    effects: effectReducer,
    weaknesses: weaknessReducer,
    targets: targetReducer,
  },
});

store.dispatch(routineAdded({ id: 0, name: "tesdt", apIds: [0] }));

store.dispatch(
  activityPathAdded({
    id: 0,
    condition: conditions.ALWAYS,
    type: activityTypes.STRIKE,
    targetType: defenses.AC,
    targetInfoId: 0,
    value: 9,
    MAP: MAPs.A1,
    damages: [0],
    effects: [],
    apIds: [],
  })
);

store.dispatch(
  targetAdded({
    id: 0,
    name: "Custom Target",
    overrideDefault: true,
    addMods: false,
    level: 1,
    useDefaultAC: false,
    defaultAC: defaultValuesAC.HIGH,
    [defenses.AC]: 15,
    useDefaultFort: false,
    defaultFort: defaultValuesSaves.HIGH,
    [defenses.FORT]: 6,
    useDefaultRef: false,
    defaultRef: defaultValuesSaves.HIGH,
    [defenses.REF]: 5,
    useDefaultWill: false,
    defaultWill: defaultValuesSaves.HIGH,
    [defenses.WILL]: 4,
    useDefaultPer: false,
    defaultPer: defaultValuesSaves.HIGH,
    [defenses.PER]: 5,
    flatfooted: false,
    weaknesses: [0],
  })
);
store.dispatch(weaknessAdded({ id: 0, type: damageTypes.FIRE, value: 10 }));
store.dispatch(
  damageAdded({
    id: 0,
    condition: dCond.STRIKE,
    diceNum: 1,
    diceSize: 8,
    staticDamage: 4,
    type: damageTypes.B,
    material: materials.COLD_IRON,
    persistent: false,
  })
);
// store.dispatch(
//   damageAdded({
//     id: 1,
//     condition: dCond.CRIT,
//     diceNum: 0,
//     diceSize: 8,
//     staticDamage: 10,
//     type: damageTypes.FIRE,
//     material: materials.NONE,
//     persistent: false,
//   })
// );

export default store;
