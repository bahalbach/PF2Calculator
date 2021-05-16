import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const weaknessAdapter = createEntityAdapter();

let weakness = 0;

export const weaknessesSlice = createSlice({
  name: "weaknesses",
  initialState: weaknessAdapter.getInitialState(),
  reducers: {
    weaknessAdded: weaknessAdapter.addOne,
    weaknessUpdated: weaknessAdapter.updateOne,
    weaknessCreated: {
      reducer: (state, action) => {
        const { id, type, value } = action.payload;
        weaknessAdapter.addOne(state, { id, type, value });
      },
      prepare: ({ parentId, type, value }) => {
        const id = ++weakness;
        return {
          payload: {
            id,
            parentId,
            type,
            value,
          },
        };
      },
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
