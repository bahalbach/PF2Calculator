import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../App/store";

export const sharingSlice = createSlice({
  name: "sharing",
  initialState: {
    graphUrl: "",
    singleLevelGraphUrl: "",
    imgLink: "",
  },
  reducers: {
    graphSaved: (state, action) => {
      state.graphUrl = action.payload;
    },
    singleLevelGraphSaved: (state, action) => {
      state.singleLevelGraphUrl = action.payload;
    },
    saveImgLink: (state, action) => {
      state.imgLink = action.payload;
    },
  },
});

export const { graphSaved, singleLevelGraphSaved, saveImgLink } =
  sharingSlice.actions;

export default sharingSlice.reducer;

export const selectGraphUrl = (state: RootState, byLevel: boolean) => {
  return byLevel ? state.sharing.graphUrl : state.sharing.singleLevelGraphUrl;
};
