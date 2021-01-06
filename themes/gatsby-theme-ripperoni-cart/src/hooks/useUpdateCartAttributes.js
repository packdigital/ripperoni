import { useCallback } from 'react';
import debounce from 'lodash/debounce';

import { useCartContext } from '../context/CartContext';

export const useUpdateCartAttributes = () => {
  const { updateAttributes, cart } = useCartContext();

  const debouncedUpdate = debounce((input) => updateAttributes(input), 500);

  const memoizedDebounceUpdate = useCallback(
    (input) => debouncedUpdate(input),
    []
  );

  const updateCartAttributes = (customAttributes) => {
    // if (!cart || !cart.ready) {
    //   throw new Error('Called updateCartAttributes too soon');
    // }

    if (!Array.isArray(customAttributes)) {
      throw new Error(
        'Cart attributes must be in the form: `[{ key: "MyKey1", value: "MyValue1"}, { key: "MyKey2", value: "MyValue2"}]`'
      );
    }

    console.log('updating cart attributes', customAttributes);

    memoizedDebounceUpdate({ customAttributes });
  };

  return updateCartAttributes;
};
