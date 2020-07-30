/** @jsx jsx */
import { useState } from 'react';
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
  const [quantity, setQuantity] = useState(initialQuantity);
  const { removeLineItems, updateLineItems } = useCartContext();
  const debouncedUpdate = debounce(quantity => {
    updateLineItems([{ id, quantity }]);
  }, 2000);

  const handleChange = event => {
    setQuantity(parseInt(event.target.value));
  };

  const handleBlur = event => {
    updateLineItems();
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
        onClick={() => {
          const newQuantity = parseInt(quantity) - 1;
          setQuantity(newQuantity);
          // debouncedUpdate(newQuantity);
        }}
      >
        -
      </Button>

      <Input
        type='number'
        step='1'
        min='0'
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{
          p: 0,
          mb: 0,
          flex: 2,
          border: 0,
          textAlign: 'center',
          outline: 'none',
          '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            margin: showControls === false && 0,
            'WebkitAppearance': showControls === false && 'none',
          },
        }}
      />

      <Button
        variant='buttons.plain'
        flex={1}
        outline='none'
        onClick={() => {
          const newQuantity = parseInt(quantity) + 1;
          setQuantity(newQuantity);
          // debouncedUpdate(newQuantity);
        }}
      >
        +
      </Button>
    </Flex>
  );
};

QuantitySelect.displayName = 'Quantity Select';

QuantitySelect.propTypes = {
  quantity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  showControls: PropTypes.bool,
};
