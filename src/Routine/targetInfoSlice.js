import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { weaknessCreated, weaknessRemoved } from "./weaknessSlice";

export const targetInfoAdapter = createEntityAdapter();

export const targetInfosSlice = createSlice({
  name: "targetInfos",
  initialState: targetInfoAdapter.getInitialState(),
  reducers: {
    targetInfoAdded: targetInfoAdapter.addOne,
    targetInfoUpdated: targetInfoAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(weaknessCreated, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        console.log(state);
        state.entities[id].weaknesses.push(weaknessId);
        // targetInfoAdded.updateOne(state, { id, changes: { weaknesses: [...weaknesses, weaknessId] }});
      })
      .addCase(weaknessRemoved, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id].weaknesses = state.entities[id].weaknesses.filter(
          (wid) => wid !== weaknessId
        );
      });
  },
});

export const { targetInfoAdded, targetInfoUpdated } = targetInfosSlice.actions;

export default targetInfosSlice.reducer;

export const {
  selectById: selecttargetInfoById,
  selectIds: selecttargetInfoIds,
  selectEntities: selecttargetInfoEntities,
  selectAll: selectAlltargetInfos,
  selectTotal: selectTotaltargetInfos,
} = targetInfoAdapter.getSelectors((state) => state.targetInfos);
