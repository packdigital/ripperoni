/** @jsx jsx */
import PropTypes from 'prop-types';
import { Input, jsx } from 'theme-ui';

import { Button, Flex } from '@ripperoni/components';


export const QuantitySelect = ({
  quantity,
  setQuantity,
  showControls = false,
  ...props
}) => {
  const changeByAmount = amount => {
    const current = parseInt(quantity);
    const change = parseInt(amount);
    const newQuantity = current + change;

    if (newQuantity >= 0) {
      setQuantity(newQuantity);
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
        onClick={() => changeByAmount(-1)}
      >
        -
      </Button>

      <Input
        type='number'
        step='1'
        min='0'
        value={quantity}
        onChange={event => setQuantity(event.target.value)}
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
        onClick={() => changeByAmount(1)}
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
  setQuantity: PropTypes.func.isRequired,
  showControls: PropTypes.bool,
};
