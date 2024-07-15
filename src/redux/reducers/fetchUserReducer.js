import { TOGGLE_IS_LOGGED, GET_USER_LOGGED_TOKEN, GET_USER_LOGGED_PROFILE } from "../actions/index";

const initialState = {
  isLogged: false,
  isAdmin: false,
  user_info: {},
};

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_LOGGED:
      return {
        ...state,
        isLogged: true,
      };
    case GET_USER_LOGGED_TOKEN:
      return {
        ...state,
        user_bearer: action.payload,
      };
    case GET_USER_LOGGED_PROFILE:
      return {
        ...state,
        user_info: action.payload,
      };
    default:
      return state;
  }
};

export default fetchUserReducer;
