import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  damageTrends,
  damageTypes,
  dCond,
  dieTrends,
  materials,
} from "../types";

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
const empty = {};
for (let i = 1; i <= 20; i++) {
  empty[i] = 0;
}

let damageId = 1;
export const damagesSlice = createSlice({
  name: "damages",
  initialState: damageAdapter.getInitialState(),
  reducers: {
    damageAdded: damageAdapter.addOne,
    damageUpdated: damageAdapter.updateOne,
    damageCreated: {
      reducer: (state, action) => {
        const { id } = action.payload;
        damageAdapter.addOne(state, {
          id,
          damageCondition: dCond.STRIKE,
          damageType: damageTypes.S,
          material: materials.NONE,
          persistent: false,
          multiplier: 1,

          dieTrend: dieTrends.NONE,
          dieAdjustments: { ...empty },
          diceSize: 6,
          damageTrend: damageTrends.NONE,
          damageAdjustments: { ...empty },
        });
      },
      prepare: ({ parentId }) => {
        const id = ++damageId;
        return {
          payload: {
            id,
            parentId,
          },
        };
      },
    },
    damageRemoved: (state, action) => {
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
