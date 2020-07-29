import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@ripperoni/components';
import { CartLineItem } from '@ripperoni/cart/components/CartLineItem';


export const CartLineItems = ({
  lineItems,
  ...props
}) => {
  if (!lineItems) {
    return null;
  }

  return (
    <Box
      data-comp={CartLineItems.displayName}
      p='22px'
      {...props}
    >
      {lineItems.map(({ title, quantity, variant, id }) => (
        <CartLineItem
          key={id}
          title={title}
          quantity={quantity}
          variant={variant}
        />
      ))}
    </Box>
  );
};

CartLineItems.displayName = 'CartLineItems';

CartLineItems.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.object)
};
