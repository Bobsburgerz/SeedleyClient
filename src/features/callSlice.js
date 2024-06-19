import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

const initialState = [];

export const callSlice = createSlice({
    name: "calls",
    initialState,
    reducers: {
        updateCalls: (_, action) => {
            return action.payload;
        },
        resetCalls: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
    
    },
});

export const {  updateCalls, resetCalls } = callSlice.actions;
export default callSlice.reducer;