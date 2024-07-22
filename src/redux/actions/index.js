import axios from "axios";

export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED";
export const GET_USER_WALLETS = "GET_USER_WALLETS";
export const GET_USER_INFO = "GET_USER_INFO";

//-----------------------------------------------------------------------------------------------------------
// Auth operations
// Login
export const LoginUserAction = (loginObject, navigate) => {
  return async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", loginObject);
      // console.log("Token:", response.data.accessToken);
      localStorage.setItem("Bearer", response.data.accessToken);
      // console.log("Token set in localStorage:", localStorage.getItem("Bearer"));
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Register new user
export const registerUserAction = (registerObject) => {
  return async () => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/register`, registerObject);
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//-----------------------------------------------------------------------------------------------------------
// Fetch user info
// Generic info
export const fetchUserInfo = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/users/me", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_USER_INFO,
        payload: response.data,
      });
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Wallets
export const fetchUserWallets = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/wallets/my-wallets", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_USER_WALLETS,
        payload: response.data,
      });
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//-----------------------------------------------------------------------------------------------------------
