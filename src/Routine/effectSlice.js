import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const effectAdapter = createEntityAdapter();

export const effectsSlice = createSlice({
  name: "effects",
  initialState: effectAdapter.getInitialState(),
  reducers: {
    effectAdded: effectAdapter.addOne,
    effectUpdated: effectAdapter.updateOne,
  },
});

export const { effectAdded, effectUpdated } = effectsSlice.actions;

export default effectsSlice.reducer;

export const {
  selectById: selecteffectById,
  selectIds: selecteffectIds,
  selectEntities: selecteffectEntities,
  selectAll: selectAlleffects,
  selectTotal: selectTotaleffects,
} = effectAdapter.getSelectors((state) => state.effects);
