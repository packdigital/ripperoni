import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';
import createPersistedState from 'use-persisted-state';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import { UPDATE_CART } from '../constants';
import { createActions } from './CartActions';
import { asyncActions, reducer } from './CartReducer';

const usePersistedCart = createPersistedState('ShopifyCheckout');
const CartContext = createContext();
export const useCartContext = useContextFactory('Cart', CartContext);

export const CartContextProvider = ({
  customer,
  messageBus,
  children,
  ...props
}) => {
  const [persistedCart, setPersistedCart] = usePersistedCart(null);
  const initialState = { cart: persistedCart, loading: {}, errors: {} };
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActions
  );
  const actions = createActions(dispatch);

  useEffect(() => {
    messageBus?.publish(UPDATE_CART, state.cart);
  }, [state.cart]);

  useEffect(() => {
    if (!isBrowser) return;

    if (!state.cart?.id || state.cart?.completedAt) {
      actions.createCheckout();
    } else {
      actions.fetchCheckout(state.cart.id);
    }
  }, []);

  useEffect(() => {
    const staleCart = state.cart?.updatedAt < persistedCart?.updatedAt;
    const stalePersistedCart = persistedCart?.updatedAt < state.cart?.updatedAt;
    const missingPersistedCart = !persistedCart && state.cart;

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
