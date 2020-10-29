/** @jsx jsx */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, jsx } from 'theme-ui';

import { Button, Flex } from '@ripperoni/components';

import { useRemoveItemFromCart } from '../../hooks/useRemoveItemFromCart';
import { useUpdateItemQuantity } from '../../hooks/useUpdateItemQuantity';

export const QuantitySelect = ({
  id,
  quantity: initialQuantity,
  showControls = false,
  ...props
}) => {
  const removeItemFromCart = useRemoveItemFromCart();
  const updateItemQuantity = useUpdateItemQuantity();
  const [quantity, setQuantity] = useState(parseInt(initialQuantity));

  const changeBy = (amount) => {
    const newQuantity = quantity + amount;
    setQuantity(newQuantity);

    if (newQuantity > 0) {
      updateItemQuantity(id, newQuantity);
    } else {
      removeItemFromCart(id);
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
        onChange={(event) => setQuantity(parseInt(event.target.value))}
        onBlur={(event) => updateItemQuantity(id, parseInt(event.target.value))}
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
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  showControls: PropTypes.bool,
};
