/**
 * @prettier
 */
import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import { createActions } from './CartActions';
import { asyncActionHandlers, reducer } from './CartReducer';

const CartContext = createContext();
const persistedCheckoutId = 'ShopifyCheckoutId';

export const useCartContext = useContextFactory('Cart', CartContext);

const initialState = {
  cart: null,
  totalItems: null,
  // associatedWithCustomer: null,
  loading: {},
  errors: {},
  ready: false,
};

export const CartContextProvider = React.memo(({ children }) => {
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActionHandlers
  );

  const actions = createActions(dispatch);

  useEffect(() => {
    if (!isBrowser) return;

    const checkoutId = localStorage.getItem(persistedCheckoutId);

    if (!checkoutId) {
      actions.createCheckout();
    } else {
      actions.fetchCheckout(checkoutId);
    }
  }, []);

  useEffect(() => {
    if (!state.cart) return;

    if (!state.ready) {
      actions.setCartReady();
    }

    const getLineTotals = (totalItems, { quantity }) => totalItems + quantity;
    const totalQuantity = state.cart.lineItems.reduce(getLineTotals, 0);

    if (totalQuantity !== state.totalItems) {
      actions.updateTotalItemsCount(totalQuantity);
    }

    if (!isBrowser) return;

    const newCheckoutId = state.cart.id;
    const checkoutId = localStorage.getItem(persistedCheckoutId);

    if (checkoutId !== newCheckoutId) {
      window.localStorage.setItem(persistedCheckoutId, newCheckoutId);
    }
  }, [state.cart, state.ready, state.totalItems]);

  const value = {
    state,
    ...actions,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
});

CartContextProvider.displayName = 'Cart Context Provider';

CartContextProvider.propTypes = {
  children: PropTypes.any,
};
