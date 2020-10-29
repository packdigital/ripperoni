import { useCartContext } from '../context/CartContext';

export const useCart = () => {
  const { cart } = useCartContext();

  return cart;
};
