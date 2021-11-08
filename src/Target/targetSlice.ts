import { createEntityAdapter, createSlice, EntityId } from "@reduxjs/toolkit";
import { ACTrends, SaveTrends } from "../Model/types";
import type { RootState } from "../App/store";
// import { defaultACs, defaultSaves } from "../defaults";
// import { defenses } from "../types";
import { weaknessCreated, weaknessRemoved } from "./weaknessSlice";

// interface limited<Type> { typeof Type[keyof typeof Type] }
// Define a type for the slice state
// interface TargetState {  }
export interface Target {
  id: EntityId;
  name: string;
  levelDiff: number;
  persistentMultiplier: number;
  ACTrend: typeof ACTrends[keyof typeof ACTrends];
  FortTrend: typeof SaveTrends[keyof typeof SaveTrends];
  RefTrend: typeof SaveTrends[keyof typeof SaveTrends];
  WillTrend: typeof SaveTrends[keyof typeof SaveTrends];
  PerTrend: typeof SaveTrends[keyof typeof SaveTrends];
  flatfooted: boolean;
  percentSelectedRoutine: boolean;
  weaknesses: number[];
}

export const targetAdapter = createEntityAdapter<Target>();

export const targetsSlice = createSlice({
  name: "targets",
  initialState: targetAdapter.getInitialState(),
  reducers: {
    targetAdded: targetAdapter.addOne,
    targetUpdated: (state, action) => {
      targetAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(weaknessCreated, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id]!.weaknesses.push(weaknessId);
        // targetAdded.updateOne(state, { id, changes: { weaknesses: [...weaknesses, weaknessId] }});
      })
      .addCase(weaknessRemoved, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id]!.weaknesses = state.entities[id]!.weaknesses.filter(
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
} = targetAdapter.getSelectors((state: RootState) => state.targets);
