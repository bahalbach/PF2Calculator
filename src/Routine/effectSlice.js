import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { conditions, effectTypes } from "../types";

export const effectAdapter = createEntityAdapter();

let effectId = 1;
export const effectsSlice = createSlice({
  name: "effects",
  initialState: effectAdapter.getInitialState(),
  reducers: {
    effectAdded: effectAdapter.addOne,
    effectUpdated: effectAdapter.updateOne,
    effectCreated: {
      reducer: (state, action) => {
        const { id } = action.payload;
        effectAdapter.addOne(state, {
          id,
          effectCondition: conditions.ALWAYS,
          effectType: effectTypes.FLATFOOT,
        });
      },
      prepare: ({ parentId }) => {
        const id = ++effectId;
        return {
          payload: {
            id,
            parentId,
          },
        };
      },
    },
    effectRemoved: (state, action) => {
      effectAdapter.removeOne(state, action.payload.id);
    },
  },
});

export const { effectAdded, effectUpdated, effectCreated, effectRemoved } =
  effectsSlice.actions;

export default effectsSlice.reducer;

export const {
  selectById: selecteffectById,
  selectIds: selecteffectIds,
  selectEntities: selecteffectEntities,
  selectAll: selectAlleffects,
  selectTotal: selectTotaleffects,
} = effectAdapter.getSelectors((state) => state.effects);
