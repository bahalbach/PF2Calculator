import { configureStore } from "@reduxjs/toolkit";
import routineReducer, { routineAdded } from "./Routine/routineSlice";
import activityPathReducer, {
  activityPathAdded,
} from "./Routine/activityPathSlice";
import damageReducer from "./Routine/damageSlice";
import effectReducer from "./Routine/effectSlice";
import targetReducer, { targetAdded } from "./Target/targetSlice";
import weaknessReducer from "./Target/weaknessSlice";
import {
  activityTypes,
  conditions,
  damageTypes,
  dCond,
  defaultActivities,
  defaultValuesAC,
  defaultValuesSaves,
  defenses,
  MAPs,
  materials,
  rollTypes,
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

store.dispatch(
  routineAdded({ id: 0, name: "Fighter", display: true, apIds: [0] })
);

store.dispatch(
  activityPathAdded({
    id: 0,
    condition: conditions.ALWAYS,
    override: false,
    level: 1,
    useDefault: false,
    defaultActivity: defaultActivities.FIGHTER,
    type: activityTypes.STRIKE,
    targetType: defenses.AC,
    targetInfoId: 0,
    value: 9,
    MAP: MAPs.N1,
    rollType: rollTypes.NORMAL,
    damageCondition: dCond.STRIKE,
    diceNum: 1,
    diceSize: 8,
    staticDamage: 4,
    damageType: damageTypes.S,
    material: materials.NONE,
    damages: [],
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
    matchRoutines: true,
    levelDiff: 0,
    useDefaultAC: true,
    defaultAC: defaultValuesAC.HIGH,
    [defenses.AC]: 16,
    useDefaultFort: true,
    defaultFort: defaultValuesSaves.MODERATE,
    [defenses.FORT]: 7,
    useDefaultRef: true,
    defaultRef: defaultValuesSaves.MODERATE,
    [defenses.REF]: 7,
    useDefaultWill: true,
    defaultWill: defaultValuesSaves.MODERATE,
    [defenses.WILL]: 7,
    useDefaultPer: true,
    defaultPer: defaultValuesSaves.MODERATE,
    [defenses.PER]: 7,
    flatfooted: false,
    weaknesses: [],
  })
);
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
