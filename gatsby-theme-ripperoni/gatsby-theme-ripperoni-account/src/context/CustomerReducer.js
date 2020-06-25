export const initialState = {
  loading: false,
  accessToken: null,
  customer: null,
  errors: {},
  loggedIn: null,
};

const requestAccount = async ({ request: action, data = {}}, accessToken, signal) => {
  const url = '/api/account';

  const options = {
    signal,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action,
      accessToken,
      ...data,
    }),
  };

  const response = await fetch(url, options);

  return response.json();
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...initialState,
        loggedIn: false,
        customer: {},
        errors: action.errors,
      };
    case 'START_ACCOUNT_REQUEST':
      return {
        ...state,
        loading: {
          [action.request]: true,
        },
      };
    case 'FINISH_ACCOUNT_REQUEST':
      return {
        ...state,
        ...action.data,
        errors: {},
        loading: false,
      };
    case 'ERROR_ACCOUNT_REQUEST':
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      throw new Error('No such action type: ${action.type}');
  }
};

export const asyncActionHandlers = {
  ACCOUNT_REQUEST: ({ dispatch, getState, signal }) => {
    return async action => {
      dispatch({ type: 'START_ACCOUNT_REQUEST', request: action.request });

      try {
        const accessToken = getState().accessToken;
        const { data, errors } = await requestAccount(action, accessToken, signal);

        if (errors) {
          dispatch({ type: 'ERROR_ACCOUNT_REQUEST', errors: { [action.request]: errors }});
        } else {
          dispatch({ type: 'FINISH_ACCOUNT_REQUEST', data });
        }
      } catch (error) {
        dispatch({ type: 'LOGOUT', errors: { logout: error }});
      }
    };
  },
};
