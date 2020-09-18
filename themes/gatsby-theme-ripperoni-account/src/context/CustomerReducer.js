export const reducer = (state, action) => {
  console.log('action', action);

  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
        customer: null,
        loggedIn: false,
        errors: action.errors,
      };
    case 'START_ACCOUNT_REQUEST':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.id]: true,
        }
      };
    case 'FINISH_ACCOUNT_REQUEST':
      return {
        ...state,
        ...action.data,
        errors: {
          ...state.errors,
          [action.id]: []
        },
        loading: {
          ...state.loading,
          [action.id]: false,
        },
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

export const asyncActionHandlers = {
  ACCOUNT_REQUEST: ({ dispatch, getState, signal }) => {
    return async action => {
      const id = action?.data?.id || action.request;

      dispatch({ type: 'START_ACCOUNT_REQUEST', id });

      try {
        const accessToken = getState().accessToken;
        const { data, errors } = await requestAccount(action, accessToken, signal);
        const loggedIn = data?.customer ? true : false;

        if (errors) {
          dispatch({ type: 'ERROR_ACCOUNT_REQUEST', errors: { [id]: errors }});
        } else {
          dispatch({ type: 'FINISH_ACCOUNT_REQUEST', id, data: { ...data, loggedIn }});
        }
      } catch (error) {
        dispatch({ type: 'LOGOUT', errors: { logout: error }});
      }
    };
  },
};
