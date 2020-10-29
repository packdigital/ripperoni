import { useCartContext } from '../context/CartContext';

export const useCartItems = () => {
  const { cart } = useCartContext();

  return cart?.lineItems || [];
};
