import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useReducerAsync } from 'use-reducer-async';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import { createActions } from './CartActions';
import { asyncActionHandlers, reducer } from './CartReducer';


const CartContext = createContext();

export const useCartContext = useContextFactory('Cart', CartContext);

const initialState = {
  cart: null,
  totalItems: null,
  loading: true,
  errors: {},
};

export const CartContextProvider = React.memo(({ children }) => {
  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);
  const actions = createActions(dispatch);

  const persistedCartId = 'shopifyCart';

  useEffect(() => {
    if (!isBrowser) return;

    const cartId = localStorage.getItem(persistedCartId);

    actions.getCart({ cartId });
  }, []);

  useEffect(() => {
    if (!state.cart?.id) {
      window.localStorage.removeItem(persistedCartId);
    } else {
      window.localStorage.setItem(persistedCartId, state.cart.id);
    }
  }, [state.cart]);

  const value = {
    state,
    ...actions,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
});

CartContextProvider.displayName = 'Cart Context Provider';

CartContextProvider.propTypes = {
  children: PropTypes.any
};
