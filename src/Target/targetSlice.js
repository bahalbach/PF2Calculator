import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// import { defaultACs, defaultSaves } from "../defaults";
// import { defenses } from "../types";
import { weaknessCreated, weaknessRemoved } from "./weaknessSlice";

export const targetAdapter = createEntityAdapter();

export const targetsSlice = createSlice({
  name: "targets",
  initialState: targetAdapter.getInitialState(),
  reducers: {
    targetAdded: targetAdapter.addOne,
    targetUpdated: {
      prepare: ({ id, changes, match, level }) => {
        if (!level) level = 1;
        if (level < 1) level = 1;
        if (level > 20) level = 20;
        return { payload: { id, changes, match, level } };
      },
      reducer: (state, action) => {
        targetAdapter.updateOne(state, action.payload);
        // const target = state.entities[action.payload.id];
        // if (!target.level) target.level = 0;
        // if (target.level < -1) target.level = -1;
        // if (target.level > 24) target.level = 24;
        // if (target.useDefaultAC) {
        //   target[defenses.AC] = defaultACs[target.defaultAC][target.level];
        // }
        // if (target.useDefaultFort) {
        //   target[defenses.FORT] =
        //     defaultSaves[target.defaultFort][target.level];
        // }
        // if (target.useDefaultRef) {
        //   target[defenses.REF] = defaultSaves[target.defaultRef][target.level];
        // }
        // if (target.useDefaultWill) {
        //   target[defenses.WILL] =
        //     defaultSaves[target.defaultWill][target.level];
        // }
        // if (target.useDefaultPer) {
        //   target[defenses.PER] = defaultSaves[target.defaultPer][target.level];
        // }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(weaknessCreated, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id].weaknesses.push(weaknessId);
        // targetAdded.updateOne(state, { id, changes: { weaknesses: [...weaknesses, weaknessId] }});
      })
      .addCase(weaknessRemoved, (state, action) => {
        const { parentId: id, id: weaknessId } = action.payload;
        state.entities[id].weaknesses = state.entities[id].weaknesses.filter(
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
} = targetAdapter.getSelectors((state) => state.targets);
