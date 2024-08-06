import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import walletsReducer from "../reducers/walletsReducer";
import transactionsReducer from "../reducers/transactionsReducer";
import categoriesReducer from "../reducers/categoriesReducer";

const rootReducer = combineReducers({
  user: userReducer,
  wallets: walletsReducer,
  transactions: transactionsReducer,
  transaction_categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
