import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fetchUserReducer from "../reducers/fetchUserReducer";

const rootReducer = combineReducers({
  user: fetchUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
