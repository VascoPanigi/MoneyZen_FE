import axios from "axios";

//------------------------------------------------ACTION TYPES EXPORTS-----------------------------------------------------------
export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED";
export const GET_USER_WALLETS = "GET_USER_WALLETS";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_SPECIFIC_WALLET = "GET_SPECIFIC_WALLET";
export const GET_WALLET_TRANSACTIONS = "GET_WALLET_TRANSACTIONS";
export const GET_SELECTED_WALLET_ID = "GET_SELECTED_WALLET_ID";

export const setSelectedWalletIdAction = (walletId, dispatch) => {
  dispatch({
    type: GET_SELECTED_WALLET_ID,
    payload: walletId,
  });
};

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
      console.log(response.data);
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

// Change a wallet's name
export const updateWalletAction = (walletObject, walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch("http://localhost:3001/wallets/" + walletId + "/name", walletObject, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
      dispatch(fetchUserSpecificWalletAction(walletId, token));
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Delete a wallet
export const deleteWalletAction = (walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete("http://localhost:3001/wallets/" + walletId, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchUserWallets(token));
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//-----------------------------------------------TRANSACTIONS OPERATIONS------------------------------------------------------------

// Get all the transaction for a specific wallet
export const fetchSpecificWalletTransactionsActions = (walletId, token, pageNum = 0, sortOrder = "DESC") => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/transactions/wallet/" + walletId + "?pageNumber=" + pageNum + "&sortOrder=" + sortOrder,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      dispatch({
        type: GET_WALLET_TRANSACTIONS,
        payload: {
          ...response.data,
        },
      });

      dispatch({
        type: GET_SELECTED_WALLET_ID,
        payload: walletId,
      });
      // console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Post a new transaction on a wallet
export const addNewTransactionAction = (transactionObject, walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/transactions/" + walletId, transactionObject, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchUserSpecificWalletAction(walletId, token));
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// delete a transaction
export const deleteTransactionAction = (transactionId, walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete("http://localhost:3001/transactions/" + transactionId, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchUserSpecificWalletAction(walletId, token));
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//-----------------------------------------------TRANSACTIONS CATEGORIES OPERATIONS------------------------------------------------------------

// Get all transaction categories
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
