import {
  createEntityAdapter,
  createSlice,
  EntityId,
  EntityState,
} from "@reduxjs/toolkit";
import { ACTrends, GraphType, SaveTrends } from "../Model/types";
import type { RootState } from "../App/store";
// import { defaultACs, defaultSaves } from "../defaults";
// import { defenses } from "../types";
import { weaknessCreated, weaknessRemoved } from "./weaknessSlice";
import { defaultACs, defaultSaves } from "../Model/defaults";

// interface limited<Type> { typeof Type[keyof typeof Type] }
// Define a type for the slice state
// interface TargetState {  }
const id = 0;
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

  graphType: GraphType;
  routineLevel: number;
  targetLevel: number;
  overrideAC: number;
  overrideFort: number;
  overrideRef: number;
  overrideWill: number;
  overridePer: number;
}

export const targetAdapter = createEntityAdapter<Target>();

export const targetsSlice = createSlice({
  name: "targets",
  initialState: targetAdapter.getInitialState(),
  reducers: {
    targetAdded: targetAdapter.addOne,
    targetUpdated: (state, action) => {
      targetAdapter.updateOne(state, action.payload);
      if ("targetLevel" in action.payload.changes) {
        updateTargetLevel(state, action.payload.changes.targetLevel);
      }
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

const updateTargetLevel = (state: EntityState<Target>, targetLevel: number) => {
  state.entities[id]!.overrideAC =
    defaultACs[state.entities[id]!.ACTrend][targetLevel];
  state.entities[id]!.overrideFort =
    defaultSaves[state.entities[id]!.FortTrend][targetLevel];
  state.entities[id]!.overrideRef =
    defaultSaves[state.entities[id]!.RefTrend][targetLevel];
  state.entities[id]!.overrideWill =
    defaultSaves[state.entities[id]!.WillTrend][targetLevel];
  state.entities[id]!.overridePer =
    defaultSaves[state.entities[id]!.PerTrend][targetLevel];
};