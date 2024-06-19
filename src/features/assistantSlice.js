import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

const initialState = [];

export const assistantSlice = createSlice({
    name: "assistants",
    initialState,
    reducers: {
        updateAssistants: (_, action) => {
            return action.payload;
        },
        resetAssistants: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.addAssistant.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateAssistant.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteAssistant.matchFulfilled, (_, { payload }) => payload);
    },
});

export const {  updateAssistants, resetAssistants } = assistantSlice.actions;
export default assistantSlice.reducer;