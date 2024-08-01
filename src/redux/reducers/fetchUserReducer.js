import {
  TOGGLE_IS_LOGGED,
  GET_USER_INFO,
  GET_USER_WALLETS,
  GET_SPECIFIC_WALLET,
  GET_WALLET_TRANSACTIONS,
} from "../actions/index";

const initialState = {
  isLogged: false,
  isAdmin: false,
  user_info: {},
  user_wallets: {},
  wallet_transactions: {},
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
    default:
      return state;
  }
};

export default fetchUserReducer;
