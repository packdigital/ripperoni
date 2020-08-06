/** @jsx jsx */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, jsx } from 'theme-ui';
import debounce from 'lodash/debounce';

import { Button, Flex } from '@ripperoni/components';
import { useCartContext } from '@ripperoni/cart/context/CartContext';


export const QuantitySelect = ({
  id,
  quantity: initialQuantity,
  showControls = false,
  ...props
}) => {
  const [quantity, setQuantity] = useState(parseInt(initialQuantity));
  const { removeLineItems, updateLineItems } = useCartContext();

  const debouncedUpdate = debounce(quantity => updateLineItems([{ id, quantity }]), 500);
  const memoizedDebounceUpdate = useCallback(quantity => debouncedUpdate(quantity), []);

  const changeBy = amount => {
    const newQuantity = quantity + amount;
    setQuantity(newQuantity);

    if (newQuantity > 0) {
      memoizedDebounceUpdate(newQuantity);
    } else {
      removeLineItems([ id ]);
    }
  };

  return (
    <Flex
      data-comp={QuantitySelect.displayName}
      variant='quantitySelect'
      {...props}
    >
      <Button
        variant='buttons.plain'
        flex={1}
        outline='none'
        onClick={() => changeBy(-1)}
      >
        -
      </Button>

      <Input
        type='number'
        step='1'
        min='0'
        value={quantity}
        onChange={event => setQuantity(parseInt(event.target.value))}
        onBlur={event => memoizedDebounceUpdate(parseInt(event.target.value))}
        sx={{
          p: 0,
          mb: 0,
          flex: 2,
          border: 0,
          textAlign: 'center',
          outline: 'none',
          '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            margin: showControls === false && 0,
            WebkitAppearance: showControls === false && 'none',
          },
        }}
      />

      <Button
        variant='buttons.plain'
        flex={1}
        outline='none'
        onClick={() => changeBy(1)}
      >
        +
      </Button>
    </Flex>
  );
};

QuantitySelect.displayName = 'Quantity Select';

QuantitySelect.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  showControls: PropTypes.bool,
};
