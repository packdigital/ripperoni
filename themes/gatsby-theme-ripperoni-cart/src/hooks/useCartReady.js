import { useEffect, useState } from 'react';

import { useCartContext } from '../context/CartContext';

export const useCartReady = () => {
  const { cart } = useCartContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (cart && !cart.completedAt) {
      setReady(true);
    }
  }, [cart]);

  return ready;
};
