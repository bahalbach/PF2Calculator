import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { damageTypes, materials } from "../Model/types";
import { RootState } from "../store";

export interface Weakness {
  id: number;
  type:
    | typeof damageTypes[keyof typeof damageTypes]
    | typeof materials[keyof typeof materials];
  value: number;
}
export const weaknessAdapter = createEntityAdapter<Weakness>();

let weakness = 0;

export const weaknessesSlice = createSlice({
  name: "weaknesses",
  initialState: weaknessAdapter.getInitialState(),
  reducers: {
    weaknessAdded: weaknessAdapter.addOne,
    weaknessUpdated: weaknessAdapter.updateOne,
    weaknessCreated: {
      reducer(state, action: PayloadAction<Weakness>) {
        const { id, type, value } = action.payload;
        weaknessAdapter.addOne(state, { id, type, value });
      },
      prepare({ parentId, type, value }) {
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
    weaknessRemoved(
      state,
      action: PayloadAction<{ parentId: EntityId; id: EntityId }>
    ) {
      weaknessAdapter.removeOne(state, action.payload.id);
    },
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
} = weaknessAdapter.getSelectors((state: RootState) => state.weaknesses);
