import axios from "axios";

export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED";
export const GET_USER_WALLETS = "GET_USER_WALLETS";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_SPECIFIC_WALLET = "GET_SPECIFIC_WALLET";

//----------------------------------------------- AUTH OPERATIONS ------------------------------------------------------------
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

//-----------------------------------------------USER OPERATIONS------------------------------------------------------------
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

//-----------------------------------------------WALLET OPERATIONS------------------------------------------------------------

// Get all wallets
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

// Create a personal wallet
export const addNewPersonalWalletAction = (registerObject, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/wallets/personal-wallets", registerObject, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
      dispatch(fetchUserWallets(token));
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Create a shared wallet
export const addNewSharedWalletAction = (registerObject, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/wallets/shared-wallets", registerObject, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
      dispatch(fetchUserWallets(token));
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Fetch a specific wallet
export const fetchUserSpecificWalletAction = (walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/wallets/" + walletId, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_SPECIFIC_WALLET,
        payload: response.data,
      });
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//-----------------------------------------------TRANSACTIONS OPERATIONS------------------------------------------------------------

// Post a new transaction on a wallet
export const addNewTransactionAction = (transactionObject, walletId, token) => {
  return async () => {
    try {
      const response = await axios.post("http://localhost:3001/transactions/" + walletId, transactionObject, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// delete a transaction
export const deleteTransactionAction = (transactionId, token) => {
  return async () => {
    try {
      const response = await axios.delete("http://localhost:3001/transactions/" + transactionId, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//-----------------------------------------------TRANSACTIONS CATEGORIES OPERATIONS------------------------------------------------------------

// Get all transaction categories to then save them in the state, divided by outcome and income ones
export const fetchAllCategories = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/categories", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};
