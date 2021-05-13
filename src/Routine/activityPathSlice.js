import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const activityPathAdapter = createEntityAdapter();

export const activityPathsSlice = createSlice({
  name: "activityPaths",
  initialState: activityPathAdapter.getInitialState(),
  reducers: {
    activityPathAdded: activityPathAdapter.addOne,
    activityPathUpdated: activityPathAdapter.updateOne,
  },
});

export const { activityPathAdded, activityPathUpdated } =
  activityPathsSlice.actions;

export default activityPathsSlice.reducer;

export const {
  selectById: selectactivityPathById,
  selectIds: selectactivityPathIds,
  selectEntities: selectactivityPathEntities,
  selectAll: selectAllactivityPaths,
  selectTotal: selectTotalactivityPaths,
} = activityPathAdapter.getSelectors((state) => state.activityPaths);
