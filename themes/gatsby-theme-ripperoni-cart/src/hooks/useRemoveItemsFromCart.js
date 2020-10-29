import { REMOVE_FROM_CART } from '../constants';
import { useCartReady } from './useCartReady';
import { useGetLineItem } from './useGetLineItem';
import { useCartContext } from '../context/CartContext';

export const useRemoveItemsFromCart = () => {
  const cartReady = useCartReady();
  const getLineItem = useGetLineItem();
  const { removeLineItems, cart, customer, messageBus } = useCartContext();

  const removeItemsFromCart = (lineItemIds) => {
    if (!cart || !cartReady) {
      throw new Error('Called removeItemsFromCart too soon');
    }

    if (!Array.isArray(lineItemIds)) {
      throw new Error('lineItemIds must be an array of line item ids');
    }

    if (lineItemIds.length < 1) {
      throw new Error('Must include at least one item to remove');
    }

    const items = lineItemIds.map((id) => getLineItem(id));

    removeLineItems(lineItemIds);

    messageBus?.publish(REMOVE_FROM_CART, { items, cart, customer });
  };

  return removeItemsFromCart;
};
