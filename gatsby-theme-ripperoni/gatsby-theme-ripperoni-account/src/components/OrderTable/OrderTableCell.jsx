import React from 'react';

import { Box, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


export const OrderTableCell = props => {
  return (
    <Box
      flex={1}
      variant='pages.account.orders.cell'
    >
      <Text
        variant='text.account.orders.cell'
        {...props}
      >
        {props.children}
      </Text>
    </Box>
  );
};
