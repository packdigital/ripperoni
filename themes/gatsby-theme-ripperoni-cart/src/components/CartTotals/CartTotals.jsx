import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Heading, Link, Price, Text } from '@ripperoni/components';

export const CartTotals = ({ subtotal, checkoutUrl, ...props }) => {
  return (
    <Box
      data-comp={CartTotals.displayName}
      p='22px'
      boxShadow='rgba(0, 0, 0, 0.027) 0px -4px 4px 0px'
      {...props}
    >
      <Flex between mb='8px'>
        <Heading size='14px'>Subtotal</Heading>

        <Price>{subtotal}</Price>
      </Flex>

      <Text size='12px' mb='16px'>
        Shipping, taxes, and discounts calculated at checkout.
      </Text>

      <Link.Button href={checkoutUrl}>Checkout</Link.Button>
    </Box>
  );
};

CartTotals.displayName = 'Cart Totals';

CartTotals.propTypes = {
  subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  checkoutUrl: PropTypes.string.isRequired,
};
