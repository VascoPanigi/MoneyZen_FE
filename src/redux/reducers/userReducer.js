import {
  TOGGLE_IS_LOGGED,
  GET_USER_INFO,
  GET_USER_WALLETS,
  GET_SPECIFIC_WALLET,
  GET_WALLET_TRANSACTIONS,
  GET_SELECTED_WALLET_ID,
  GET_TRANSACTION_ID,
  FETCH_FILTERED_TRANSACTIONS_REQUEST,
  FETCH_FILTERED_TRANSACTIONS_SUCCESS,
  FETCH_FILTERED_TRANSACTIONS_FAILURE,
} from "../actions/index";

const initialState = {
  isLogged: false,
  isAdmin: false,
  user_info: {},
  user_wallets: {},
  selected_wallet_id: null,
  selected_transaction_id: null,
  wallet_transactions: {},
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_LOGGED:
      return {
        ...state,
        isLogged: true,
      };
    case GET_USER_INFO:
      return {
        ...state,
        user_info: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
