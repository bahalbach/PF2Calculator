import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const weaknessAdapter = createEntityAdapter();

export const weaknessesSlice = createSlice({
  name: "weaknesses",
  initialState: weaknessAdapter.getInitialState(),
  reducers: {
    weaknessAdded: weaknessAdapter.addOne,
    weaknessUpdated: weaknessAdapter.updateOne,
    weaknessCreated: (state, action) => {
      const { id, type, value } = action.payload;
      weaknessAdapter.addOne(state, { id, type, value });
    },
    weaknessRemoved: weaknessAdapter.removeOne,
  },
});

export const {
  weaknessRemoved,
  weaknessCreated,
  weaknessAdded,
  weaknessUpdated,
} = weaknessesSlice.actions;

export default weaknessesSlice.reducer;

export const {
  selectById: selectweaknessById,
  selectIds: selectweaknessIds,
  selectEntities: selectweaknessEntities,
  selectAll: selectAllweaknesses,
  selectTotal: selectTotalweaknesses,
} = weaknessAdapter.getSelectors((state) => state.weaknesses);
