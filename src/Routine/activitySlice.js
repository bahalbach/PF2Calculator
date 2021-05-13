import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const activityAdapter = createEntityAdapter();

export const activitiesSlice = createSlice({
  name: "activities",
  initialState: activityAdapter.getInitialState(),
  reducers: {
    activityAdded: activityAdapter.addOne,
    activityUpdated: activityAdapter.updateOne,
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
