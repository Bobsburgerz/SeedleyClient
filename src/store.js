import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice"
import appApi from "./services/appApi"; 
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from './features/authSlice'
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import assistantSlice from "./features/assistantSlice";
import callSlice from "./features/callSlice"
import phoneNumSlice from "./features/phoneNumSlice"
import storage from "redux-persist/lib/storage";
import loadingSlice from "./features/loadingSlice";
 
 
const reducer = combineReducers({
 
    calls: callSlice,
    assistants: assistantSlice,
    phoneNum: phoneNumSlice,
    user: userSlice,
    products: productSlice,
    auth: authReducer,
    [appApi.reducerPath]: appApi.reducer,

});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "products"],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
    devTools: true
});
setupListeners(store.dispatch)
export default store;