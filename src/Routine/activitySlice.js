import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { damageCreated, damageRemoved } from "./damageSlice";

export const activityAdapter = createEntityAdapter();

export const activitiesSlice = createSlice({
  name: "activities",
  initialState: activityAdapter.getInitialState(),
  reducers: {
    activityAdded: activityAdapter.addOne,
    activityUpdated: activityAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(damageCreated, (state, action) => {
        const { parentId: id, id: damageId } = action.payload;
        console.log(state);
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

export const { activityAdded, activityUpdated } = activitiesSlice.actions;

export default activitiesSlice.reducer;

export const {
  selectById: selectactivityById,
  selectIds: selectactivityIds,
  selectEntities: selectactivityEntities,
  selectAll: selectAllactivities,
  selectTotal: selectTotalactivities,
} = activityAdapter.getSelectors((state) => state.activities);
