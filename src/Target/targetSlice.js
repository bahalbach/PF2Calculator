import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { defaultACs } from "../defaults";
import { defenses } from "../types";
import { weaknessCreated, weaknessRemoved } from "./weaknessSlice";

export const targetAdapter = createEntityAdapter();

export const targetsSlice = createSlice({
  name: "targets",
  initialState: targetAdapter.getInitialState(),
  reducers: {
    targetAdded: targetAdapter.addOne,
    targetUpdated: (state, action) => {
      targetAdapter.updateOne(state, action.payload);
      const target = state.entities[action.payload.id];
      if (!target.level) target.level = 0;
      if (target.level < -1) target.level = -1;
      if (target.level > 24) target.level = 24;
      if (target.useDefaultAC) {
        target[defenses.AC] = defaultACs[target.defaultAC][target.level];
      }
    },
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
