import { useAddItemsToCart } from './useAddItemsToCart';

export const useAddItemToCart = () => {
  const addItemsToCart = useAddItemsToCart();

  const addItemToCart = (variantId, quantity, customAttributes) => {
    if (!variantId) {
      throw new Error('VariantId must not be blank or null');
    }

    if (!quantity) {
      throw new Error('Quantity must not be blank or null');
    }

    addItemsToCart([{ variantId, quantity, customAttributes }]);
  };

  return addItemToCart;
};
