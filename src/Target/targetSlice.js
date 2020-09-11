import { createSlice } from '@reduxjs/toolkit';

export const targetSlice = createSlice({
  name: 'target',
  initialState: {
    level: 1,
    AC: 15,
  },
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload || 0;
    },
    setAC: (state, action) => {
      state.AC = action.payload || 0;
    },
  },
});

export const { setLevel, setAC } = targetSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLevel = state => state.target.level;
export const selectAC = state => state.target.AC;
export const selectTarget = state => state.target;

export default targetSlice.reducer;