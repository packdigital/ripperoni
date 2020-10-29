import { useRemoveItemsFromCart } from './useRemoveItemsFromCart';

export const useRemoveItemFromCart = () => {
  const removeItemsFromCart = useRemoveItemsFromCart();

  const removeItemFromCart = (lineItemId) => {
    if (!lineItemId) {
      throw new Error('lineItemId must not be blank or null');
    }

    removeItemsFromCart([lineItemId]);
  };

  return removeItemFromCart;
};
