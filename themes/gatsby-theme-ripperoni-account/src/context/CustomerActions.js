/**
 * @prettier
 */
const SET_CUSTOMER_READY = 'SET_CUSTOMER_READY';
const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS';
const GET_CUSTOMER = 'GET_CUSTOMER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
const RESET_PASSWORD = 'RESET_PASSWORD';
const CREATE_CUSTOMER_ADDRESS = 'CREATE_CUSTOMER_ADDRESS';
const DELETE_CUSTOMER_ADDRESS = 'DELETE_CUSTOMER_ADDRESS';
const UPDATE_CUSTOMER_ADDRESS = 'UPDATE_CUSTOMER_ADDRESS';
const LOGIN_OR_CREATE_CUSTOMER = 'LOGIN_OR_CREATE_CUSTOMER';

export const createActions = (dispatch) => {
  return {
    setCustomerReady: () => {
      dispatch({ type: SET_CUSTOMER_READY });
    },
    updateLoggedInStatus: (data) => {
      dispatch({ type: UPDATE_LOGGED_IN_STATUS, data });
    },
    getCustomer: (data) => {
      dispatch({ type: GET_CUSTOMER, data });
    },
    login: (data) => {
      dispatch({ type: LOGIN, data });
    },
    logout: () => {
      dispatch({ type: LOGOUT });
    },
    createCustomer: (data) => {
      dispatch({ type: CREATE_CUSTOMER, data });
    },
    recoverPassword: (data) => {
      dispatch({ type: RECOVER_PASSWORD, data });
    },
    resetPassword: (data) => {
      dispatch({ type: RESET_PASSWORD, data });
    },
    createAddress: (data) => {
      dispatch({ type: CREATE_CUSTOMER_ADDRESS, data });
    },
    deleteAddress: (data) => {
      dispatch({ type: DELETE_CUSTOMER_ADDRESS, data });
    },
    updateAddress: (data) => {
      dispatch({ type: UPDATE_CUSTOMER_ADDRESS, data });
    },
    loginOrCreate: (data) => {
      dispatch({ type: LOGIN_OR_CREATE_CUSTOMER, data });
    },
  };
};
