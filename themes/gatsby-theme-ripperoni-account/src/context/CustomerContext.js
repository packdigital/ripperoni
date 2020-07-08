import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import { createActions } from './CustomerActions';
import { asyncActionHandlers, reducer } from './CustomerReducer';


const CustomerContext = createContext();

export const useCustomerContext = useContextFactory('Customer', CustomerContext);

const initialState = {
  accessToken: null,
  customer: null,
  errors: {},
  loading: false,
  loggedIn: null,
};

export const CustomerContextProvider = React.memo(({ children }) => {
  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);
  const actions = createActions(dispatch);

  useEffect(() => {
    if (!isBrowser || state.loggedIn !== null) return;

    const customerFromStorage = JSON.parse(localStorage.getItem('customer'));
    const accessToken = customerFromStorage?.accessToken;

    if (accessToken) {
      actions.get({ accessToken });
    } else {
      actions.logout();
    }
  }, []);

  useEffect(() => {
    if (!state.accessToken) {
      window.localStorage.removeItem('customer');
    } else {
      window.localStorage.setItem('customer', JSON.stringify({ accessToken: state.accessToken }));
    }
  }, [state.accessToken]);

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
  children: PropTypes.any
};
