import { TOGGLE_IS_LOGGED, GET_USER_INFO } from "../actions/index";

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
