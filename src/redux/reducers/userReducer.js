import { TOGGLE_IS_LOGGED, GET_USER_INFO } from "../actions/index";

const initialState = {
  isLogged: false,
  isAdmin: false,
  user_info: {},
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
