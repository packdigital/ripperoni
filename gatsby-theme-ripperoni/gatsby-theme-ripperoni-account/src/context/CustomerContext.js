import React, { createContext, useState, useEffect } from 'react';
import { useReducerAsync } from 'use-reducer-async';
import { isBrowser } from '@packdigital/ripperoni-utilities';

import { createActions } from './CustomerActions';
import { initialState, reducer, asyncActionHandlers } from './CustomerReducer';


export const CustomerContext = createContext();

export const CustomerContextProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);

  const actions = createActions(dispatch);

  useEffect(() => {
    if (!isBrowser) return;

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
      window.ShopifyCustomer = undefined;
      window.localStorage.removeItem('customer');
    } else {
      const newAccessToken = JSON.stringify({ accessToken: state.accessToken });

      window.localStorage.setItem('customer', newAccessToken);
    }
  }, [state.accessToken]);

  useEffect(() => {
    window.ShopifyCustomer = state.customer;
  }, [state.customer]);

  const value = {
    customer: state,
    ...actions,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
