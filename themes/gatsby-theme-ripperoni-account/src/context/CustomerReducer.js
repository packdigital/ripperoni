import update from 'immutability-helper';

export const reducer = (state, action) => {
  // console.log('action:account', action);

  switch (action.type) {
    case 'LOGOUT_CUSTOMER':
      return update(state, {
        accessToken: { $set: null },
        customer: { $set: false },
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
      throw new Error(`No such action type: ${action.type}`);
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

export const asyncActions = {
  LOGIN_OR_CREATE_CUSTOMER: asyncActionWrapper('customerLoginOrCreate'),
  GET_CUSTOMER: asyncActionWrapper('customerGet'),
  LOGIN_CUSTOMER: asyncActionWrapper('customerLogin'),
  CREATE_CUSTOMER: asyncActionWrapper('customerCreate'),
  RECOVER_PASSWORD: asyncActionWrapper('passwordRecover'),
  RESET_PASSWORD: asyncActionWrapper('passwordReset'),
  CREATE_CUSTOMER_ADDRESS: asyncActionWrapper('addressCreate'),
  DELETE_CUSTOMER_ADDRESS: asyncActionWrapper('addressDelete'),
  UPDATE_CUSTOMER_ADDRESS: asyncActionWrapper('addressUpdate'),
};
