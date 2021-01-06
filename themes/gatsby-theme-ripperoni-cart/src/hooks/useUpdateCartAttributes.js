import { useCallback } from 'react';
import debounce from 'lodash/debounce';

import { useCartContext } from '../context/CartContext';

export const useUpdateCartAttributes = () => {
  const { updateAttributes } = useCartContext();

  const debouncedUpdate = debounce((input) => updateAttributes(input), 500);

  const memoizedDebounceUpdate = useCallback(
    (input) => debouncedUpdate(input),
    []
  );

  const updateCartAttributes = (customAttributes) => {
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
