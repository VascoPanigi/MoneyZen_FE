import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fetchUserReducer from "../reducers/fetchUserReducer";
import categoriesReducer from "../reducers/categoriesReducer";

const rootReducer = combineReducers({
  user: fetchUserReducer,
  transaction_categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
