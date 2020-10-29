import { useCartContext } from '../context/CartContext';

export const useCartCount = () => {
  const { cart } = useCartContext();
  const getLineTotals = (total, { quantity }) => total + quantity;
  const totalItems = cart?.lineItems?.reduce(getLineTotals, 0);

  return totalItems || 0;
};
