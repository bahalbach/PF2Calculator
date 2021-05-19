import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { damageTypes, dCond, materials } from "../types";

export const damageAdapter = createEntityAdapter();

// damageAdded({
//   id: 0,
//   condition: dCond.STRIKE,
//   diceNum: 1,
//   diceSize: 8,
//   staticDamage: 6,
//   type: damageTypes.PIERCE,
//   material: materials.COLD_IRON,
// });

let damageId = 1;
export const damagesSlice = createSlice({
  name: "damages",
  initialState: damageAdapter.getInitialState(),
  reducers: {
    damageAdded: damageAdapter.addOne,
    damageUpdated: damageAdapter.updateOne,
    damageCreated: {
      reducer: (state, action) => {
        const {
          id,
          condition,
          diceNum,
          diceSize,
          staticDamage,
          type,
          material,
          persistent,
        } = action.payload;
        damageAdapter.addOne(state, {
          id,
          condition,
          diceNum,
          diceSize,
          staticDamage,
          type,
          material,
          persistent,
        });
      },
      prepare: ({ parentId }) => {
        const id = ++damageId;
        return {
          payload: {
            id,
            parentId,
            condition: dCond.STRIKE,
            diceNum: 0,
            diceSize: 8,
            staticDamage: 0,
            type: damageTypes.B,
            material: materials.NONE,
            persistent: false,
          },
        };
      },
    },
    damageRemoved: (state, action) => {
      console.log(action);
      damageAdapter.removeOne(state, action.payload.id);
    },
  },
});

export const { damageRemoved, damageCreated, damageAdded, damageUpdated } =
  damagesSlice.actions;

export default damagesSlice.reducer;

export const {
  selectById: selectdamageById,
  selectIds: selectdamageIds,
  selectEntities: selectdamageEntities,
  selectAll: selectAlldamages,
  selectTotal: selectTotaldamages,
} = damageAdapter.getSelectors((state) => state.damages);
