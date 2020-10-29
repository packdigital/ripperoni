import { useCallback } from 'react';
import debounce from 'lodash/debounce';

import { useCartReady } from './useCartReady';
import { useCartContext } from '../context/CartContext';
import { useGetLineItem } from '../hooks/useGetLineItem';
import { useRemoveItemFromCart } from './useRemoveItemFromCart';
import { UPDATE_CART_QUANTITY } from '../constants';

export const useUpdateItemQuantity = () => {
  const cartReady = useCartReady();
  const getLineItem = useGetLineItem();
  const removeLineItem = useRemoveItemFromCart();
  const { updateLineItems, cart, customer, messageBus } = useCartContext();

  const debouncedUpdate = debounce(
    (id, quantity) => updateLineItems([{ id, quantity }]),
    500
  );

  const memoizedDebounceUpdate = useCallback(
    (id, quantity) => debouncedUpdate(id, quantity),
    []
  );

  const updateItemQuantity = (lineItemId, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!cart || !cartReady) {
      throw new Error('Called updateItemQuantity too soon');
    }

    if (!lineItemId) {
      throw new Error('Must provide a variant id');
    }

    if (isNaN(parsedQuantity)) {
      throw new Error('Quantity must be number');
    }

    if (parsedQuantity === 0) {
      removeLineItem(lineItemId);
    } else {
      memoizedDebounceUpdate(lineItemId, parsedQuantity);
    }

    const lineItem = getLineItem(lineItemId);

    messageBus?.publish(UPDATE_CART_QUANTITY, {
      lineItem,
      quantity,
      cart,
      customer,
    });
  };

  return updateItemQuantity;
};
