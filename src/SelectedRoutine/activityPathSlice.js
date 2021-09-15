import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  activityTypes,
  conditions,
  bonusTrends,
  defenses,
  MAPs,
  nextMAPs,
  rollTypes,
} from "../Model/types";
import { damageCreated, damageRemoved } from "./damageSlice";
import { effectCreated, effectRemoved } from "./effectSlice";

export const activityPathAdapter = createEntityAdapter();

const empty = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
}
let activityPathId = 1;
const defaultParentActivity = {
  rollType: rollTypes.NORMAL,
  type: activityTypes.STRIKE,
  bonusTrend: bonusTrends.MARTIALWEAPON,
  bonusAdjustments: { ...empty },
  MAP: MAPs.N1,
  targetType: defenses.AC,
};

export const activityPathsSlice = createSlice({
  name: "activityPaths",
  initialState: activityPathAdapter.getInitialState(),
  reducers: {
    activityPathAdded: activityPathAdapter.addOne,
    activityPathUpdated: (state, action) => {
      activityPathAdapter.updateOne(state, action.payload);
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

          rollType: rollTypes.NORMAL,
          type: activityTypes.STRIKE,
          bonusTrend: parentAP.bonusTrend,
          bonusAdjustments: { ...parentAP.bonusAdjustments },
          MAP: applyMAP ? nextMAPs[parentAP.MAP] : parentAP.MAP,
          targetType: defenses.AC,
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
      .addCase(effectCreated, (state, action) => {
        const { parentId: id, id: effectId } = action.payload;
        state.entities[id].effects.push(effectId);
      })
      .addCase(effectRemoved, (state, action) => {
        const { parentId: id, id: effectId } = action.payload;
        state.entities[id].effects = state.entities[id].effects.filter(
          (eid) => eid !== effectId
        );
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
