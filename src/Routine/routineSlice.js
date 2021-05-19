import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { activityPathCreated } from "./activityPathSlice";

export const routinesAdapter = createEntityAdapter();

let routineId = 1;
export const routinesSlice = createSlice({
  name: "routines",
  initialState: routinesAdapter.getInitialState({ selectedRoutine: 0 }),
  reducers: {
    setRoutine: (state, action) => {
      state.selectedRoutine = action.payload || 0;
    },
    routineAdded: routinesAdapter.addOne,
    routineUpdated: routinesAdapter.updateOne,
    routineCreated: {
      reducer: (state, action) => {
        const { id, name, apIds } = action.payload;
        routinesAdapter.addOne(state, { id, name, apIds });
      },
      prepare: () => {
        const id = ++routineId;
        return { payload: { id, name: "New Routine", apIds: [] } };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(activityPathCreated, (state, action) => {
      const { routineId: id, id: apId } = action.payload;
      if (id !== undefined) state.entities[id].apIds.push(id);
    });
  },
});

export const {
  routineCreated,
  setRoutine,
  updateSelected,
  routineAdded,
  routineUpdated,
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
