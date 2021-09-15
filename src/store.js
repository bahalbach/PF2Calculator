import { configureStore } from "@reduxjs/toolkit";
import routineReducer, { routineAdded } from "./Routines/routineSlice";
import activityPathReducer, {
  activityPathAdded,
} from "./SelectedRoutine/activityPathSlice";
import damageReducer, { damageAdded } from "./SelectedRoutine/damageSlice";
import effectReducer from "./SelectedRoutine/effectSlice";
import targetReducer, { targetAdded } from "./Target/targetSlice";
import weaknessReducer from "./Target/weaknessSlice";
import {
  activityTypes,
  ACTrends,
  conditions,
  damageTrends,
  damageTypes,
  dCond,
  defenses,
  dieTrends,
  itemTrends,
  MAPs,
  materials,
  profTrends,
  rollTypes,
  SaveTrends,
  statTrends,
} from "./Model/types";

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
  routineAdded({ id: 0, name: "Martial", display: true, apIds: [0] })
);

const empty = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
}
store.dispatch(
  activityPathAdded({
    id: 0,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.STRIKE,
    profTrend: profTrends.MARTIALWEAPON,
    statTrend: statTrends.AS18a,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: { ...empty },
    MAP: MAPs.N1,

    targetType: defenses.AC,
    targetInfoId: 0,

    damages: [0],
    effects: [],
    apIds: [],
  })
);

store.dispatch(
  damageAdded({
    id: 0,
    damageCondition: dCond.STRIKE,
    damageType: damageTypes.S,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,

    dieTrend: dieTrends.WEAPON,
    dieAdjustments: { ...empty },
    diceSize: 8,
    damageTrend: damageTrends.MARTIALMELEE,
    damageAdjustments: { ...empty },
  })
);

store.dispatch(
  targetAdded({
    id: 0,
    name: "Custom Target",

    // overrideDefault: true,
    // addMods: false,
    // // level: 1,
    // matchRoutines: true,
    levelDiff: 0,

    // useDefaultAC: true,
    // defaultAC: defaultValuesAC.HIGH,
    // [defenses.AC]: 16,
    // useDefaultFort: true,
    // defaultFort: defaultValuesSaves.MODERATE,
    // [defenses.FORT]: 7,
    // useDefaultRef: true,
    // defaultRef: defaultValuesSaves.MODERATE,
    // [defenses.REF]: 7,
    // useDefaultWill: true,
    // defaultWill: defaultValuesSaves.MODERATE,
    // [defenses.WILL]: 7,
    // useDefaultPer: true,
    // defaultPer: defaultValuesSaves.MODERATE,
    // [defenses.PER]: 7,

    ACTrend: ACTrends.HIGH,
    FortTrend: SaveTrends.MODERATE,
    RefTrend: SaveTrends.MODERATE,
    WillTrend: SaveTrends.MODERATE,
    PerTrend: SaveTrends.MODERATE,

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
