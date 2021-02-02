import { useEffect, useRef } from 'react';

import { ADD_TO_CART } from '../constants';
import { useCartContext } from '../context/CartContext';

export const useAddItemsToCart = () => {
  const itemsRef = useRef(null);
  const addLineItemsLoadingRef = useRef(null);
  const { addLineItems, cart, state, customer, messageBus } = useCartContext();

  useEffect(() => {
    const wasLoading = addLineItemsLoadingRef.current === true;
    const finishedLoading = state.loading.addLineItems === false;

    if (wasLoading && finishedLoading) {
      const items = itemsRef.current;

      messageBus?.publish(ADD_TO_CART, { items, cart, customer });
    }

    addLineItemsLoadingRef.current = state.loading.addLineItems;
  }, [cart, state.loading.addLineItems]);

  const addItemsToCart = (items) => {
    if (items.length < 1) {
      throw new Error('Must include at least one line item');
    }

    items.forEach(({ variantId, quantity }) => {
      if (!variantId) {
        throw new Error(`Missing variantId in item`);
      }

      if (!quantity) {
        throw new Error(`Missing quantity: ${variantId}`);
      } else if (typeof quantity != 'number') {
        throw new Error(`Quantity is not a number: ${variantId}`);
      } else if (quantity < 1) {
        throw new Error(`Quantity must not be less than one: ${variantId}`);
      }
    });

    itemsRef.current = items;

    addLineItems(items);
  };

  return addItemsToCart;
};
