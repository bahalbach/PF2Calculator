import { configureStore } from "@reduxjs/toolkit";
import routineReducer, { routineAdded } from "./Routines/routineSlice";
import activityPathReducer, {
  activityPathAdded,
} from "./SelectedRoutine/activityPathSlice";
import damageReducer, { damageAdded } from "./SelectedRoutine/damageSlice";
import effectReducer, { effectAdded } from "./SelectedRoutine/effectSlice";
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
  effectTypes,
  itemTrends,
  MAPs,
  materials,
  profTrends,
  rollTypes,
  SaveTrends,
  statTrends,
} from "./Model/types";

const empty = {};
const pickCritSpec = {};
const one = {};
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
  targetAdded({
    id: 0,
    name: "AC: High, saves: Moderate",

    levelDiff: 0,

    ACTrend: ACTrends.HIGH,
    FortTrend: SaveTrends.MODERATE,
    RefTrend: SaveTrends.MODERATE,
    WillTrend: SaveTrends.MODERATE,
    PerTrend: SaveTrends.MODERATE,

    flatfooted: false,
    weaknesses: [],
  })
);

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

store.dispatch(
  routineAdded({
    id: 1,
    name: "Greatsword Fighter 2 strikes",
    display: true,
    apIds: [0],
    levelDiff: 0,
    description:
      "A simple Fighter making 2 strikes with a greatsword. 1d6 damage runes at 8 and 15. Crit specialization at 5.",
    startLevel: 1,
    endLevel: 20,
  })
);
store.dispatch(
  activityPathAdded({
    id: 0,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.STRIKE,
    profTrend: profTrends.FIGHTERWEAPON,
    statTrend: statTrends.AS18a,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: { ...empty },
    MAP: MAPs.N1,

    targetType: defenses.AC,
    targetInfoId: 0,

    damages: [0, 1],
    effects: [0],
    apIds: [1],
  })
);
store.dispatch(
  damageAdded({
    id: 0,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.WEAPON,
    dieAdjustments: { ...empty },
    diceSize: 12,
    fatal: false,
    fatalDie: 10,
    damageTrend: [damageTrends.AS18a, damageTrends.FIGHTERWEAPONSPEC],
    damageAdjustments: { ...empty },

    damageType: damageTypes.S,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,
  })
);
store.dispatch(
  damageAdded({
    id: 1,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.RUNE,
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
  })
);
store.dispatch(
  effectAdded({
    id: 0,
    effectCondition: conditions.CRIT,
    effectType: effectTypes.FLATFOOT,
    startLevel: 5,
    endLevel: 20,
  })
);
store.dispatch(
  activityPathAdded({
    id: 1,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.STRIKE,
    profTrend: profTrends.FIGHTERWEAPON,
    statTrend: statTrends.AS18a,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: { ...empty },
    MAP: MAPs.N2,

    targetType: defenses.AC,
    targetInfoId: 0,

    damages: [2, 3],
    effects: [1],
    apIds: [],
  })
);
store.dispatch(
  damageAdded({
    id: 2,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.WEAPON,
    dieAdjustments: { ...empty },
    diceSize: 12,
    fatal: false,
    fatalDie: 10,
    damageTrend: [damageTrends.AS18a, damageTrends.FIGHTERWEAPONSPEC],
    damageAdjustments: { ...empty },

    damageType: damageTypes.S,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,
  })
);
store.dispatch(
  damageAdded({
    id: 3,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.RUNE,
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
  })
);
store.dispatch(
  effectAdded({
    id: 1,
    effectCondition: conditions.CRIT,
    effectType: effectTypes.FLATFOOT,
    startLevel: 5,
    endLevel: 20,
  })
);

store.dispatch(
  routineAdded({
    id: 2,
    name: "Fireball",
    display: true,
    apIds: [2],
    levelDiff: 0,
    description: "A 2d6 / spell level basic reflex save.",
    startLevel: 1,
    endLevel: 20,
  })
);
store.dispatch(
  activityPathAdded({
    id: 2,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.SAVE,
    profTrend: profTrends.CASTERSPELL,
    statTrend: statTrends.AS18a,
    itemTrend: itemTrends.NONE,
    bonusAdjustments: { ...empty },
    MAP: MAPs.N1,

    targetType: defenses.REF,
    targetInfoId: 0,

    damages: [4],
    effects: [],
    apIds: [],
  })
);
store.dispatch(
  damageAdded({
    id: 4,
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
  })
);

store.dispatch(
  routineAdded({
    id: 3,
    name: "Pick Fighter Double Slice",
    display: false,
    apIds: [3, 4],
    levelDiff: 0,
    description:
      "A Fighter using Double Slice with a pick and a light pick. 1d6 damage runes at 8 and 15. Crit specialization at 5.",
    startLevel: 1,
    endLevel: 20,
  })
);
store.dispatch(
  activityPathAdded({
    id: 3,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.STRIKE,
    profTrend: profTrends.FIGHTERWEAPON,
    statTrend: statTrends.AS18a,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: { ...empty },
    MAP: MAPs.N1,

    targetType: defenses.AC,
    targetInfoId: 0,

    damages: [5, 6, 7],
    effects: [],
    apIds: [],
  })
);
store.dispatch(
  damageAdded({
    id: 5,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.WEAPON,
    dieAdjustments: { ...empty },
    diceSize: 6,
    fatal: true,
    fatalDie: 10,
    damageTrend: [damageTrends.AS18a, damageTrends.FIGHTERWEAPONSPEC],
    damageAdjustments: { ...empty },

    damageType: damageTypes.P,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,
  })
);
store.dispatch(
  damageAdded({
    id: 6,
    damageCondition: dCond.CRIT,

    dieTrend: dieTrends.NONE,
    dieAdjustments: { ...one },
    diceSize: 10,
    fatal: false,
    fatalDie: 10,
    damageTrend: [],
    damageAdjustments: { ...pickCritSpec },

    damageType: damageTypes.P,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,
  })
);
store.dispatch(
  damageAdded({
    id: 7,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.RUNE,
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
  })
);
store.dispatch(
  activityPathAdded({
    id: 4,
    condition: conditions.ALWAYS,

    rollType: rollTypes.NORMAL,
    type: activityTypes.STRIKE,
    profTrend: profTrends.FIGHTERWEAPON,
    statTrend: statTrends.AS18a,
    itemTrend: itemTrends.WEAPON,
    bonusAdjustments: { ...empty },
    MAP: MAPs.A1,

    targetType: defenses.AC,
    targetInfoId: 0,

    damages: [8, 9, 10],
    effects: [],
    apIds: [],
  })
);
store.dispatch(
  damageAdded({
    id: 8,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.WEAPON,
    dieAdjustments: { ...empty },
    diceSize: 4,
    fatal: true,
    fatalDie: 8,
    damageTrend: [damageTrends.AS18a, damageTrends.FIGHTERWEAPONSPEC],
    damageAdjustments: { ...empty },

    damageType: damageTypes.P,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,
  })
);
store.dispatch(
  damageAdded({
    id: 9,
    damageCondition: dCond.CRIT,

    dieTrend: dieTrends.NONE,
    dieAdjustments: { ...one },
    diceSize: 8,
    fatal: false,
    fatalDie: 10,
    damageTrend: [],
    damageAdjustments: { ...pickCritSpec },

    damageType: damageTypes.P,
    material: materials.NONE,
    persistent: false,
    multiplier: 1,
  })
);
store.dispatch(
  damageAdded({
    id: 10,
    damageCondition: dCond.STRIKE,

    dieTrend: dieTrends.RUNE,
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

export default store;
