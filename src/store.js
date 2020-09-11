import { configureStore } from '@reduxjs/toolkit';
import effectReducer from './Effect/effectSlice';
import targetReducer from './Target/targetSlice';

export default configureStore({
  reducer: {
    effect: effectReducer,
    target: targetReducer,
  },
});