import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  activityPathCreated,
  activityPathRemoved,
} from "../SelectedRoutine/activityPathSlice";

export const routinesAdapter = createEntityAdapter();

let routineId = 100;
export const routinesSlice = createSlice({
  name: "routines",
  initialState: routinesAdapter.getInitialState({ selectedRoutine: 0 }),
  reducers: {
    setRoutine: (state, action) => {
      state.selectedRoutine = action.payload || 0;
    },
    routineAdded: routinesAdapter.addOne,
    routineUpdated: routinesAdapter.updateOne,
    routineRemoved: (state, action) => {
      routinesAdapter.removeOne(state, action);
      if (action.payload === state.selectedRoutine)
        state.selectedRoutine = state.ids ? state.ids[0] : undefined;
    },
    routineCreated: {
      reducer: (state, action) => {
        const { id } = action.payload;
        state.selectedRoutine = id;
        routinesAdapter.addOne(state, {
          id,
          name: "New Routine",
          display: true,
          apIds: [],
          levelDiff: 0,
          description: "Enter a description here.",
          startLevel: 1,
          endLevel: 20,
        });
      },
      prepare: () => {
        const id = ++routineId;
        return { payload: { id } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activityPathCreated, (state, action) => {
        const { routineId: id, id: apId } = action.payload;
        if (id !== undefined) state.entities[id].apIds.push(apId);
      })
      .addCase(activityPathRemoved, (state, action) => {
        const { routineId, id } = action.payload;
        if (routineId !== undefined) {
          state.entities[routineId].apIds = state.entities[
            routineId
          ].apIds.filter((apId) => apId !== id);
        }
      });
  },
});

export const {
  routineCreated,
  setRoutine,
  updateSelected,
  routineAdded,
  routineUpdated,
  routineRemoved,
} = routinesSlice.actions;

export default routinesSlice.reducer;

export const {
  selectById: selectRoutineById,
  selectIds: selectRoutineIds,
  selectEntities: selectRoutineEntities,
  selectAll: selectAllRoutines,
  selectTotal: selectTotalRoutines,
} = routinesAdapter.getSelectors((state) => state.routines);

export const selectSelectedRoutine = (state) => state.routines.selectedRoutine;
