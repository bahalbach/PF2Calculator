import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const damageAdapter = createEntityAdapter();

export const damagesSlice = createSlice({
  name: "damages",
  initialState: damageAdapter.getInitialState(),
  reducers: {
    damageAdded: damageAdapter.addOne,
    damageUpdated: damageAdapter.updateOne,
  },
});

export const { damageAdded, damageUpdated } = damagesSlice.actions;

export default damagesSlice.reducer;

export const {
  selectById: selectdamageById,
  selectIds: selectdamageIds,
  selectEntities: selectdamageEntities,
  selectAll: selectAlldamages,
  selectTotal: selectTotaldamages,
} = damageAdapter.getSelectors((state) => state.damages);
