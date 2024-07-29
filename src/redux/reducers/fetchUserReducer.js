import { TOGGLE_IS_LOGGED, GET_USER_INFO, GET_USER_WALLETS, GET_SPECIFIC_WALLET } from "../actions/index";

const initialState = {
  isLogged: false,
  isAdmin: false,
  user_info: {},
  user_wallets: {},
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
    default:
      return state;
  }
};

export default fetchUserReducer;
