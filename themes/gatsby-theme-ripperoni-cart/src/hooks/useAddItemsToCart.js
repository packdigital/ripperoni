import { ADD_TO_CART } from '../constants';
import { useCartReady } from './useCartReady';
import { useCartContext } from '../context/CartContext';

export const useAddItemsToCart = () => {
  const cartReady = useCartReady();
  const { addLineItems, cart, customer, messageBus } = useCartContext();

  const addItemsToCart = (items) => {
    if (!cart || !cartReady) {
      throw new Error('Called addItemsToCart too soon');
    }

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

    addLineItems(items);

    messageBus?.publish(ADD_TO_CART, { items, cart, customer });
  };

  return addItemsToCart;
};
