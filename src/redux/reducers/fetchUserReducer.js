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

const fetchUserReducer = (state = initialState, action) => {
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
    case GET_USER_WALLETS:
      return {
        ...state,
        user_wallets: action.payload,
      };
    case GET_SPECIFIC_WALLET:
      return {
        ...state,
        user_wallets: state.user_wallets.map((wallet) => (wallet.id === action.payload.id ? action.payload : wallet)),
      };
    case GET_WALLET_TRANSACTIONS:
      return {
        ...state,
        wallet_transactions: action.payload,
      };
    case GET_SELECTED_WALLET_ID:
      return {
        ...state,
        selected_wallet_id: action.payload,
      };
    case GET_TRANSACTION_ID:
      return {
        ...state,
        selected_transaction_id: action.payload,
      };
    case FETCH_FILTERED_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FILTERED_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        wallet_transactions: action.payload,
      };
    case FETCH_FILTERED_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchUserReducer;
