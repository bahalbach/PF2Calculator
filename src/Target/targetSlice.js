import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { weaknessCreated, weaknessRemoved } from "./weaknessSlice";

export const targetAdapter = createEntityAdapter();

export const targetsSlice = createSlice({
  name: "targets",
  initialState: targetAdapter.getInitialState(),
  reducers: {
    targetAdded: targetAdapter.addOne,
    targetUpdated: targetAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(weaknessCreated, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id].weaknesses.push(weaknessId);
        // targetAdded.updateOne(state, { id, changes: { weaknesses: [...weaknesses, weaknessId] }});
      })
      .addCase(weaknessRemoved, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id].weaknesses = state.entities[id].weaknesses.filter(
          (wid) => wid !== weaknessId
        );
      });
  },
});

export const { targetAdded, targetUpdated } = targetsSlice.actions;

export default targetsSlice.reducer;

export const {
  selectById: selecttargetById,
  selectIds: selecttargetIds,
  selectEntities: selecttargetEntities,
  selectAll: selectAlltargets,
  selectTotal: selectTotaltargets,
} = targetAdapter.getSelectors((state) => state.targets);
