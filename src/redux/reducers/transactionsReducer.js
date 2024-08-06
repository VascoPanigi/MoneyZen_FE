import {
  GET_TRANSACTION_ID,
  FETCH_FILTERED_TRANSACTIONS_REQUEST,
  FETCH_FILTERED_TRANSACTIONS_SUCCESS,
  FETCH_FILTERED_TRANSACTIONS_FAILURE,
  GET_WALLET_TRANSACTIONS,
} from "../actions/index";

const initialState = {
  selected_transaction_id: null,
  wallet_transactions: {},
  loading: false,
  error: null,
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_TRANSACTIONS:
      return {
        ...state,
        wallet_transactions: action.payload,
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

export default transactionsReducer;
