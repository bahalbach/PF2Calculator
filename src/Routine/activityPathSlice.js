import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { activityTypes, conditions, defenses, MAPs } from "../types";
import { damageCreated, damageRemoved } from "./damageSlice";

export const activityPathAdapter = createEntityAdapter();

let activityPathId = 1;
export const activityPathsSlice = createSlice({
  name: "activityPaths",
  initialState: activityPathAdapter.getInitialState(),
  reducers: {
    activityPathAdded: activityPathAdapter.addOne,
    activityPathUpdated: activityPathAdapter.updateOne,
    activityPathCreated: {
      reducer: (state, action) => {
        const {
          id,
          parentId,
          condition,
          type,
          targetType,
          targetInfoId,
          value,
          MAP,
          damages,
          effects,
          apIds,
        } = action.payload;
        activityPathAdapter.addOne(state, {
          id,
          condition,
          type,
          targetType,
          targetInfoId,
          value,
          MAP,
          damages,
          effects,
          apIds,
        });
        // console.log(parentId);
        if (parentId !== undefined) state.entities[parentId].apIds.push(id);
      },
      prepare: ({ parentId, routineId }) => {
        const id = ++activityPathId;
        return {
          payload: {
            id,
            parentId,
            routineId,
            condition: conditions.ALWAYS,
            type: activityTypes.STRIKE,
            targetType: defenses.AC,
            targetInfoId: 0,
            value: 9,
            MAP: MAPs.A1,
            damages: [],
            effects: [],
            apIds: [],
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
      });
  },
});

export const { activityPathCreated, activityPathAdded, activityPathUpdated } =
  activityPathsSlice.actions;

export default activityPathsSlice.reducer;

export const {
  selectById: selectactivityPathById,
  selectIds: selectactivityPathIds,
  selectEntities: selectactivityPathEntities,
  selectAll: selectAllactivityPaths,
  selectTotal: selectTotalactivityPaths,
} = activityPathAdapter.getSelectors((state) => state.activityPaths);
