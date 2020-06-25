// Types
const LOGOUT = 'LOGOUT';
const ACCOUNT_REQUEST = 'ACCOUNT_REQUEST';

// Request Types
const GET = 'customer-get';
const LOGIN = 'customer-login';
const CREATE = 'customer-create';
const RECOVER = 'password-recover';
const RESET = 'password-reset';
const CREATE_ADDRESS = 'address-create';
const DELETE_ADDRESS = 'address-delete';
const UPDATE_ADDRESS = 'address-update';
const DEFAULT_ADDRESS = 'address-default';
const LOGIN_OR_CREATE = 'customer-login-or-create';

export const createActions = dispatch => {
  return {
    logout: () => {
      dispatch({ type: LOGOUT, errors: {}});
    },
    get: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: GET, data });
    },
    login: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: LOGIN, data });
    },
    create: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: CREATE, data });
    },
    recover: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: RECOVER, data });
    },
    reset: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: RESET, data });
    },
    createAddress: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: CREATE_ADDRESS, data });
    },
    deleteAddress: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: DELETE_ADDRESS, data });
    },
    updateAddress: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: UPDATE_ADDRESS, data });
    },
    defaultAddress: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: DEFAULT_ADDRESS, data });
    },
    loginOrCreate: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: LOGIN_OR_CREATE, data });
    }
  };
};
