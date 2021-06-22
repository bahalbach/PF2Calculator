import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  defaultDamageConditions,
  defaultDiceNum,
  defaultStatic,
  defaultTargetTypes,
  defaultTypes,
  defaultValues,
} from "../defaults";
import { targetUpdated } from "../Target/targetSlice";
import {
  activityTypes,
  conditions,
  damageTypes,
  dCond,
  defaultActivities,
  defenses,
  MAPs,
  materials,
  nextMAPs,
} from "../types";
import { damageCreated, damageRemoved } from "./damageSlice";

function setDefault(state, apId, setChildren = true) {
  function applyDefault(apId) {
    const ap = state.entities[apId];
    if (ap.override) {
      return;
    }
    const defaultActivity = ap.defaultActivity;
    ap.type = defaultTypes[defaultActivity];
    ap.targetType = defaultTargetTypes[defaultActivity];
    ap.value = defaultValues[defaultActivity][ap.level];
    ap.damageCondition = defaultDamageConditions[defaultActivity];
    ap.diceNum = defaultDiceNum[defaultActivity][ap.level];
    ap.staticDamage = defaultStatic[defaultActivity][ap.level];
    if (setChildren) {
      for (let apId of ap.apIds) {
        state.entities[apId].level = ap.level;
        applyDefault(apId);
      }
    }
  }
  applyDefault(apId);
}
export const activityPathAdapter = createEntityAdapter();

let activityPathId = 1;
const defaultParentActivity = {
  level: 1,
  useDefault: false,
  defaultActivity: defaultActivities.FIGHTER,
  type: activityTypes.STRIKE,
  targetType: defenses.AC,
  value: 9,
  MAP: MAPs.N1,
  damageCondition: dCond.STRIKE,
  diceNum: 1,
  diceSize: 8,
  staticDamage: 4,
  damageType: damageTypes.S,
  material: materials.NONE,
};

export const activityPathsSlice = createSlice({
  name: "activityPaths",
  initialState: activityPathAdapter.getInitialState(),
  reducers: {
    activityPathAdded: activityPathAdapter.addOne,
    activityPathUpdated: (state, action) => {
      activityPathAdapter.updateOne(state, action.payload);
      setDefault(state, action.payload.id);
    },
    activityPathRemoved: (state, action) => {
      const { id, parentId } = action.payload;
      activityPathAdapter.removeOne(state, id);
      if (parentId !== undefined) {
        state.entities[parentId].apIds = state.entities[parentId].apIds.filter(
          (apId) => apId !== id
        );
      }
    },
    activityPathCreated: {
      reducer: (state, action) => {
        const { id, parentId, applyMAP } = action.payload;

        let parentAP;
        if (parentId !== undefined) {
          parentAP = state.entities[parentId];
        } else {
          parentAP = defaultParentActivity;
        }

        activityPathAdapter.addOne(state, {
          id,
          condition: conditions.ALWAYS,
          override: false,
          level: parentAP.level,
          useDefault: parentAP.useDefault,
          defaultActivity: parentAP.defaultActivity,
          type: parentAP.type,
          targetType: parentAP.targetType,
          targetInfoId: 0,
          value: parentAP.value,
          MAP: applyMAP ? nextMAPs[parentAP.MAP] : parentAP.MAP,
          damageCondition: parentAP.damageCondition,
          diceNum: parentAP.diceNum,
          diceSize: parentAP.diceSize,
          staticDamage: parentAP.staticDamage,
          damageType: parentAP.damageType,
          material: parentAP.material,
          damages: [],
          effects: [],
          apIds: [],
        });

        if (parentId !== undefined) state.entities[parentId].apIds.push(id);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(damageCreated, (state, action) => {
        const { parentId: id, id: damageId } = action.payload;
        state.entities[id].damages.push(damageId);
      })
      .addCase(damageRemoved, (state, action) => {
        const { parentId: id, id: damageId } = action.payload;
        state.entities[id].damages = state.entities[id].damages.filter(
          (did) => did !== damageId
        );
      })
      .addCase(targetUpdated, (state, action) => {
        const { match, level } = action.payload;
        defaultParentActivity.level = level;
        if (match) {
          for (let id of state.ids) {
            state.entities[id].level = level;
            setDefault(state, id, false);
          }
        }
      });
  },
});

export const {
  activityPathCreated,
  activityPathAdded,
  activityPathUpdated,
  activityPathRemoved,
} = activityPathsSlice.actions;

export default activityPathsSlice.reducer;

export const {
  selectById: selectactivityPathById,
  selectIds: selectactivityPathIds,
  selectEntities: selectactivityPathEntities,
  selectAll: selectAllactivityPaths,
  selectTotal: selectTotalactivityPaths,
} = activityPathAdapter.getSelectors((state) => state.activityPaths);
