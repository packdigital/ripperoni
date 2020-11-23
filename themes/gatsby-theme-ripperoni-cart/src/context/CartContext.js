import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';
import useLocalStorageState from 'use-local-storage-state';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import { UPDATE_CART } from '../constants';
import { createActions } from './CartActions';
import { asyncActions, domain, reducer } from './CartReducer';

const CartContext = createContext();
export const useCartContext = useContextFactory('Cart', CartContext);

export const CartContextProvider = ({ customer, messageBus, children }) => {
  const persistedCartKey = `ShopifyCheckout--${domain}`;

  // prettier-ignore
  const [persistedCart, setPersistedCart] = useLocalStorageState(persistedCartKey, null);
  const initial = { cart: persistedCart, loading: {}, errors: {} };
  const [state, dispatch] = useReducerAsync(reducer, initial, asyncActions);
  const actions = createActions(dispatch);

  useEffect(() => {
    if (!isBrowser) return;

    console.log('Initial cart being fetched');

    actions.fetchCheckout();
  }, []);

  useEffect(() => {
    messageBus?.publish(UPDATE_CART, state.cart);
  }, [state.cart]);

  useEffect(() => {
    console.log('state.cart was updated', state.cart);
    const isCompleted = state.cart?.completedAt || persistedCart?.completedAt;
    const staleCart = state.cart?.updatedAt < persistedCart?.updatedAt;
    const stalePersistedCart = persistedCart?.updatedAt < state.cart?.updatedAt;
    const missingPersistedCart = !persistedCart && state.cart;

    if (isCompleted) {
      actions.fetchCheckout();
      return;
    }

    if (staleCart) {
      actions.refreshCart(persistedCart);
    }

    if (stalePersistedCart || missingPersistedCart) {
      setPersistedCart(state.cart);
    }
  }, [state.cart, persistedCart]);

  const value = {
    state,
    customer,
    messageBus,
    ...state,
    ...actions,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartContextProvider.displayName = 'Cart Context Provider';

CartContextProvider.propTypes = {
  customer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  messageBus: PropTypes.object,
  children: PropTypes.any,
};
