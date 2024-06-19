import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

const initialState = [];

export const phoneNumSlice = createSlice({
    name: "phoneNum",
    initialState,
    reducers: {
        updatePhoneNum: (_, action) => {
            return action.payload;
        },
        resetPhoneNum: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.addNumber.matchFulfilled, (_, { payload }) => payload);
         
        builder.addMatcher(appApi.endpoints.deleteNumber.matchFulfilled, (_, { payload }) => payload);
    },
});

export const {  updatePhoneNum, resetPhoneNumS} = phoneNumSlice.actions;
export default phoneNumSlice.reducer;