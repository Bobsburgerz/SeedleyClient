import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

const initialState = [];

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    updateTeam: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.updateTeam.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { updateTeam } = teamSlice.actions;
export default teamSlice.reducer;