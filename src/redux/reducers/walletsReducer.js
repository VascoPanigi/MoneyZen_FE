import { GET_USER_WALLETS, GET_SPECIFIC_WALLET, GET_SELECTED_WALLET_ID } from "../actions/index";

const initialState = {
  user_wallets: {},
  selected_wallet_id: null,
};

const walletsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case GET_SELECTED_WALLET_ID:
      return {
        ...state,
        selected_wallet_id: action.payload,
      };
    default:
      return state;
  }
};

export default walletsReducer;
