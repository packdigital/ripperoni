/**
 * @prettier
 */
import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';

import {
  getLegacyShopifyId,
  isBrowser,
  useContextFactory,
} from '@packdigital/ripperoni-utilities';

import { createActions } from './CustomerActions';
import { asyncActionHandlers, reducer } from './CustomerReducer';

const CustomerContext = createContext();
const persistedCustomerId = 'customer';

export const useCustomerContext = useContextFactory(
  'Customer',
  CustomerContext
);

const initialState = {
  accessToken: null,
  customer: null,
  loggedIn: false,
  errors: {},
  loading: {},
  ready: false,
};

export const CustomerContextProvider = React.memo(({ children }) => {
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActionHandlers
  );

  const actions = createActions(dispatch);

  const getAccessTokenFromLocalStorage = () => {
    const customerLocalStorage = localStorage.getItem(persistedCustomerId);
    const customerFromStorage = JSON.parse(customerLocalStorage);

    return customerFromStorage?.accessToken;
  };

  useEffect(() => {
    if (!isBrowser) return;

    const accessToken = getAccessTokenFromLocalStorage();

    if (accessToken) {
      actions.getCustomer({ accessToken });
    } else {
      actions.setCustomerReady();
    }
  }, []);

  useEffect(() => {
    if (state.customer && !state.ready) {
      actions.setCustomerReady();
    }
  }, [state.customer, state.ready]);

  useEffect(() => {
    if (state.customer && !state.loggedIn) {
      actions.updateLoggedInStatus(true);
    }

    if (!state.customer && state.loggedIn) {
      actions.updateLoggedInStatus(false);
    }
  }, [state.customer, state.loggedin]);

  useEffect(() => {
    if (!isBrowser) return;

    const accessToken = state.accessToken;
    const localStorageAccessToken = getAccessTokenFromLocalStorage();

    if (!accessToken && localStorageAccessToken) {
      window.localStorage.removeItem(persistedCustomerId);
    }

    if (accessToken && !localStorageAccessToken) {
      const id = getLegacyShopifyId(state.customer?.id || '');
      const accessTokenJson = JSON.stringify({ id, accessToken });

      window.localStorage.setItem(persistedCustomerId, accessTokenJson);
      window.localStorage.setItem('customer-id', id);
    }
  }, [state.accessToken, state.customer]);

  const value = {
    state,
    ...actions,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
});

CustomerContextProvider.displayName = 'Customer Context';

CustomerContextProvider.propTypes = {
  children: PropTypes.any,
};
