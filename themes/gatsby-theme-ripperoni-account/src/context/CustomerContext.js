import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';
import useLocalStorageState from 'use-local-storage-state';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import { createActions } from './CustomerActions';
import { asyncActions, reducer } from './CustomerReducer';
import { usePrevious } from '../hooks/usePrevious';

// const usePersistedCustomer = createPersistedState('ShopifyCustomer');
const CustomerContext = createContext();

export const useCustomerContext = useContextFactory(
  'Customer',
  CustomerContext
);

// customer === null   <-- no data yet
// customer === false  <-- logged out
export const CustomerContextProvider = ({ children, ...props }) => {
  const [persistedCustomer, setPersistedCustomer] = useLocalStorageState(
    'ShopifyCustomer',
    null
  );
  const prevPersistedCustomer = usePrevious(persistedCustomer);

  const initialState = {
    accessToken: persistedCustomer,
    customer: null,
    loading: {},
    errors: {},
  };

  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActions
  );

  const prevAccessToken = usePrevious(state.accessToken);
  const actions = createActions(dispatch);

  useEffect(() => {
    if (!isBrowser) return;

    const isValidToken = Date.parse(state.accessToken?.expires) > Date.now();

    if (state.accessToken && isValidToken) {
      actions.getCustomer({ accessToken: state.accessToken });
    } else {
      // log customer out
      actions.logoutCustomer();
      setPersistedCustomer(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedOut = state.customer === false;
    const persistedCustomerChanged =
      persistedCustomer?.token !== prevPersistedCustomer?.token;
    const accessTokenChanged =
      state.accessToken?.token !== prevAccessToken?.token;
    const persistedCustomerMissing = persistedCustomer === null;

    if (!persistedCustomerChanged && isLoggedOut && persistedCustomerMissing) {
      setPersistedCustomer(false);
    }

    if (persistedCustomerChanged && persistedCustomer) {
      actions.getCustomer({ accessToken: persistedCustomer });
    }

    if (persistedCustomerChanged && !persistedCustomer) {
      actions.logoutCustomer();
    }

    if (!persistedCustomerChanged && accessTokenChanged) {
      setPersistedCustomer(state.accessToken);
    }
  }, [
    state.customer,
    state.accessToken,
    persistedCustomer,
    prevAccessToken,
    prevPersistedCustomer,
  ]);

  const value = {
    state,
    ...state,
    ...actions,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

CustomerContextProvider.displayName = 'Customer Context';

CustomerContextProvider.propTypes = {
  children: PropTypes.any,
};
