import axios from "axios";
import cloneDeep from "lodash/cloneDeep";

//------------------------------------------------ACTION TYPES EXPORTS-----------------------------------------------------------
export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED";
export const GET_USER_WALLETS = "GET_USER_WALLETS";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_SPECIFIC_WALLET = "GET_SPECIFIC_WALLET";
export const GET_WALLET_TRANSACTIONS = "GET_WALLET_TRANSACTIONS";
export const GET_SELECTED_WALLET_ID = "GET_SELECTED_WALLET_ID";
export const GET_TRANSACTION_ID = "GET_TRANSACTION_ID";
export const GET_WALLET_TRANSACTIONS_LIST = "GET_WALLET_TRANSACTIONS_LIST";

export const FETCH_FILTERED_TRANSACTIONS_REQUEST = "FETCH_FILTERED_TRANSACTIONS_REQUEST";
export const FETCH_FILTERED_TRANSACTIONS_SUCCESS = "FETCH_FILTERED_TRANSACTIONS_SUCCESS";
export const FETCH_FILTERED_TRANSACTIONS_FAILURE = "FETCH_FILTERED_TRANSACTIONS_FAILURE";

//----------------------------------------------- ID SELECTION OPERATIONS ------------------------------------------------------------

const baseURL = import.meta.env.VITE_API_URL;
console.log(baseURL);

// Store selected wallet id in the store
export const setSelectedWalletIdAction = (walletId) => {
  return {
    type: GET_SELECTED_WALLET_ID,
    payload: walletId,
  };
};

// Store selected transaction id in the store
export const getTransactionId = (value) => {
  return {
    type: GET_TRANSACTION_ID,
    payload: value,
  };
};

//----------------------------------------------- AUTH OPERATIONS ------------------------------------------------------------
// Login
export const LoginUserAction = (loginObject, navigate) => {
  return async () => {
    try {
      const response = await axios.post(baseURL + "auth/login", loginObject);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("Bearer", response.data.accessToken);
        navigate("/home");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return {
          success: false,
          message: err.response.data.errorMessage || "Login failed due to bad request.",
        };
      }
      return { success: false, message: "An unexpected error occurred." };
    }
  };
};

// Register new user
export const registerUserAction = (registerObject) => {
  return async () => {
    try {
      const response = await axios.post(baseURL + "auth/register", registerObject);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("Bearer", response.data.userId);
        return { success: true, message: "Registration successful!" };
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return {
          success: false,
          message: err.response.data.errorMessage || "Registration failed due to bad request.",
        };
      }
      return { success: false, message: "An unexpected error occurred." };
    }
  };
};

//-----------------------------------------------USER OPERATIONS------------------------------------------------------------
// Fetch generic info
export const fetchUserInfo = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(baseURL + "users/me", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_USER_INFO,
        payload: response.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Patch user profile picture
export const patchUserAvatarAction = (file, token) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await axios.patch(baseURL + "users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      dispatch(fetchUserInfo(token));
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Update user profile
export const modifyUserProfileAction = (token, userObject) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(baseURL + "users/me", userObject, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(fetchUserInfo(token));
      console.log(response.data);
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
      const response = await axios.get(baseURL + "wallets/my-wallets", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_USER_WALLETS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Create a personal wallet
export const addNewPersonalWalletAction = (registerObject, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(baseURL + "wallets/personal-wallets", registerObject, {
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
      const response = await axios.post(baseURL + "wallets/shared-wallets", registerObject, {
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
      const response = await axios.get(baseURL + "wallets/" + walletId, {
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

// Change a wallet's name
export const updateWalletAction = (walletObject, walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(baseURL + "wallets/" + walletId + "/name", walletObject, {
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
      const response = await axios.delete(baseURL + "wallets/" + walletId, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchUserWallets(token));
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Action to let a user join a shared wallet
export const addUserToSharedWallet = (token, walletId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(baseURL + "wallets/shared-wallets/users", walletId, {
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

// Get all the transaction for a specific wallet LIST
export const fetchAllWalletTransactions = (walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(baseURL + "transactions/wallet/" + walletId + "/all-transactions", {
        headers: { Authorization: "Bearer " + token },
      });

      dispatch({
        type: GET_WALLET_TRANSACTIONS_LIST,
        payload: cloneDeep(response.data),
      });

      // console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Get all the transaction for a specific wallet PAGEABLE
export const fetchSpecificWalletTransactionsActions = (
  walletId,
  token,
  pageNum = 0,
  sortOrder = "DESC",
  sortedBy = "date"
) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        baseURL +
          "transactions/wallet/" +
          walletId +
          "?pageNumber=" +
          pageNum +
          "&sortOrder=" +
          sortOrder +
          "&sortedBy=" +
          sortedBy,
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

// Filter transaction by name
export const fetchSpecificWalletTransactionsByNameActions = (walletId, token, name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(baseURL + "transactions/wallet/" + walletId + "?name=" + name, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_WALLET_TRANSACTIONS,
        payload: {
          ...response.data,
        },
      });
      // console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Advanced filter for transactions
export const fetchFilteredTransactionsRequest = (walletId, token, filters) => ({
  type: FETCH_FILTERED_TRANSACTIONS_REQUEST,
  payload: { walletId, token, filters },
});

export const fetchFilteredTransactionsSuccess = (transactions) => ({
  type: FETCH_FILTERED_TRANSACTIONS_SUCCESS,
  payload: transactions,
});

export const fetchFilteredTransactionsFailure = (error) => ({
  type: FETCH_FILTERED_TRANSACTIONS_FAILURE,
  payload: error,
});

export const fetchFilteredTransactions = (walletId, token, filters) => {
  return async (dispatch) => {
    dispatch(fetchFilteredTransactionsRequest(walletId, token, filters));
    try {
      const response = await axios.get(baseURL + `transactions/wallet/${walletId}`, {
        params: filters,
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchFilteredTransactionsSuccess(response.data));
    } catch (error) {
      dispatch(fetchFilteredTransactionsFailure(error.message));
    }
  };
};

// Post a new transaction on a wallet
export const addNewTransactionAction = (transactionObject, walletId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(baseURL + "transactions/" + walletId, transactionObject, {
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
      const response = await axios.delete(baseURL + "transactions/" + transactionId, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchSpecificWalletTransactionsActions(walletId, token));
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

//modify a transaction
export const modifyTransactionAction = (transactionId, token, walletId, transactionObject) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(baseURL + "transactions/" + transactionId, transactionObject, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchSpecificWalletTransactionsActions(walletId, token));
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
      const response = await axios.get(baseURL + "categories", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
