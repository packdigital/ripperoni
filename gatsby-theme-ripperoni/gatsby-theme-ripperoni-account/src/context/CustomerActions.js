// Types
const LOGOUT = 'LOGOUT';
const ACCOUNT_REQUEST = 'ACCOUNT_REQUEST';

// Request Types
const GET = 'customerGet';
const LOGIN = 'customerLogin';
const CREATE = 'customerCreate';
const RECOVER = 'passwordRecover';
const RESET = 'passwordReset';
const CREATE_ADDRESS = 'addressCreate';
const DELETE_ADDRESS = 'addressDelete';
const UPDATE_ADDRESS = 'addressUpdate';
const LOGIN_OR_CREATE = 'customerLoginOrCreate';

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
    loginOrCreate: data => {
      dispatch({ type: ACCOUNT_REQUEST, request: LOGIN_OR_CREATE, data });
    }
  };
};
