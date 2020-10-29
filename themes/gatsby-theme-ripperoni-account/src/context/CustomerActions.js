const GET_CUSTOMER = 'GET_CUSTOMER';
const LOGIN_CUSTOMER = 'LOGIN_CUSTOMER';
const LOGOUT_CUSTOMER = 'LOGOUT_CUSTOMER';
const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
const RESET_PASSWORD = 'RESET_PASSWORD';
const CREATE_CUSTOMER_ADDRESS = 'CREATE_CUSTOMER_ADDRESS';
const DELETE_CUSTOMER_ADDRESS = 'DELETE_CUSTOMER_ADDRESS';
const UPDATE_CUSTOMER_ADDRESS = 'UPDATE_CUSTOMER_ADDRESS';
const LOGIN_OR_CREATE_CUSTOMER = 'LOGIN_OR_CREATE_CUSTOMER';

export const createActions = (dispatch) => {
  return {
    getCustomer: (data) => {
      dispatch({ type: GET_CUSTOMER, data });
    },
    logoutCustomer: () => {
      dispatch({ type: LOGOUT_CUSTOMER });
    },
    loginCustomer: (data) => {
      dispatch({ type: LOGIN_CUSTOMER, data });
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
