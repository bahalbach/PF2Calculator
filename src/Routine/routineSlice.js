import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const routinesAdapter = createEntityAdapter();

export const routinesSlice = createSlice({
  name: "routines",
  initialState: routinesAdapter.getInitialState({ selectedRoutine: 0 }),
  reducers: {
    setRoutine: (state, action) => {
      state.selectedRoutine = action.payload || 0;
    },
    routineAdded: routinesAdapter.addOne,
    routineUpdated: routinesAdapter.updateOne,
  },
});

export const { setRoutine, updateSelected, routineAdded, routineUpdated } =
  routinesSlice.actions;

export default routinesSlice.reducer;

export const {
  selectById: selectRoutineById,
  selectIds: selectRoutineIds,
  selectEntities: selectRoutineEntities,
  selectAll: selectAllRoutines,
  selectTotal: selectTotalRoutines,
} = routinesAdapter.getSelectors((state) => state.routines);

export const selectSelectedRoutine = (state) => state.routines.selectedRoutine;
