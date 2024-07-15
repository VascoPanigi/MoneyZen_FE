import axios from "axios";

export const GET_USER_LOGGED_TOKEN = "GET_USER_LOGGED_TOKEN";
export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED";
export const GET_USER_LOGGED_PROFILE = "GET_USER_LOGGED_PROFILE";

export const fetchUserAction = (loginObject, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", loginObject);
      dispatch({
        type: GET_USER_LOGGED_TOKEN,
        payload: response.data,
      });
      localStorage.setItem("Bearer", response.data.token);
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };
};
