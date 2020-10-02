/**
 * @prettier
 */
import update from 'immutability-helper';

export const reducer = (state, action) => {
  console.log('action', action);

  switch (action.type) {
    case 'SET_CUSTOMER_READY':
      return update(state, {
        ready: { $set: true },
      });
    case 'UPDATE_LOGGED_IN_STATUS':
      return update(state, {
        loggedIn: { $set: action.data },
      });
    case 'LOGOUT':
      return update(state, {
        accessToken: { $set: null },
        customer: { $set: null },
        loggedIn: { $set: false },
        errors: { $set: {} },
      });
    case 'START_ACCOUNT_REQUEST':
      return update(state, {
        loading: {
          [action.name]: { $set: true },
        },
      });
    case 'FINISH_ACCOUNT_REQUEST':
      return update(state, {
        $merge: action.data,
        errors: {
          [action.name]: { $set: [] },
        },
        loading: {
          [action.name]: { $set: false },
        },
      });
    case 'ERROR_ACCOUNT_REQUEST':
      return update(state, {
        errors: {
          [action.name]: { $set: action.errors },
        },
        loading: {
          [action.name]: { $set: false },
        },
      });
    default:
      throw new Error('No such action type: ${action.type}');
  }
};

const requestAccount = async (data, signal) => {
  const url = '/api/account';
  const method = 'POST';
  const body = JSON.stringify(data);
  const headers = { 'Content-Type': 'application/json' };

  const response = await fetch(url, { method, body, headers, signal });

  return response.json();
};

const asyncActionWrapper = (asyncAction) => (reducerAsync) => (action) => {
  const { dispatch, getState, signal } = reducerAsync;
  const name = asyncAction;
  const accessToken = getState().accessToken;
  const body = { action: name, accessToken, ...action.data };

  dispatch({ type: 'START_ACCOUNT_REQUEST', name });

  const handleResponse = ({ data, errors }) => {
    return !errors
      ? dispatch({ type: 'FINISH_ACCOUNT_REQUEST', name, data })
      : dispatch({ type: 'ERROR_ACCOUNT_REQUEST', name, errors });
  };

  const handleError = (error) =>
    dispatch({ type: 'ERROR_ACCOUNT_REQUEST', name, errors: error });
  // dispatch({ type: 'LOGOUT', errors: { logout: error } });

  requestAccount(body, signal).then(handleResponse).catch(handleError);
};

export const asyncActionHandlers = {
  LOGIN_OR_CREATE_CUSTOMER: asyncActionWrapper('customerLoginOrCreate'),
  GET_CUSTOMER: asyncActionWrapper('customerGet'),
  LOGIN: asyncActionWrapper('customerLogin'),
  CREATE_CUSTOMER: asyncActionWrapper('customerCreate'),
  RECOVER_CUSTOMER: asyncActionWrapper('passwordRecover'),
  RESET_CUSTOMER: asyncActionWrapper('passwordReset'),
  CREATE_CUSTOMER_ADDRESS: asyncActionWrapper('addressCreate'),
  DELETE_CUSTOMER_ADDRESS: asyncActionWrapper('addressDelete'),
  UPDATE_CUSTOMER_ADDRESS: asyncActionWrapper('addressUpdate'),
};
