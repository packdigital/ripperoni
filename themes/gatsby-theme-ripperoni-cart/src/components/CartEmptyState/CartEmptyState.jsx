import React from 'react';

import { useUIContext } from '@ripperoni/core';
import { Box, Link, Text } from '@ripperoni/components';

export const CartEmptyState = (props) => {
  const { toggleCart } = useUIContext();

  return (
    <Box data-comp={CartEmptyState.displayName} p='22px' {...props}>
      <Text mb='10px'>Your cart is currently empty.</Text>

      <Link to='/collections/all' onClick={() => toggleCart()}>
        Browse All
      </Link>
    </Box>
  );
};

CartEmptyState.displayName = 'Cart Empty State';
