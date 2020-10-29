import { useCartContext } from '../context/CartContext';

export const useCheckoutUrl = () => {
  const { cart } = useCartContext();

  return cart?.webUrl || null;
};
