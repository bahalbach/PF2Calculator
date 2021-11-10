import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../App/store";

export const sharingSlice = createSlice({
  name: "sharing",
  initialState: {
    graphUrl: "",
    imgLink: "",
  },
  reducers: {
    graphSaved: (state, action) => {
      state.graphUrl = action.payload;
    },
    saveImgLink: (state, action) => {
      state.imgLink = action.payload;
    },
  },
});

export const { graphSaved, saveImgLink } = sharingSlice.actions;

export default sharingSlice.reducer;

export const selectGraphUrl = (state: RootState) => {
  return state.sharing.graphUrl;
};
