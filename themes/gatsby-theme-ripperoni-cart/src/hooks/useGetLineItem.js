import { useCartItems } from './useCartItems';

export const useGetLineItem = () => {
  const cartItems = useCartItems();

  function getLineItem(lineItemId) {
    if (cartItems.length < 1) {
      return null;
    }

    return cartItems.find(({ id }) => id === lineItemId) || null;
  }

  return getLineItem;
};
