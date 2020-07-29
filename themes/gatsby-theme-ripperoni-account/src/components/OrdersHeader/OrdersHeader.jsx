import React from 'react';

import { Flex, Heading } from '@ripperoni/components';


export const OrdersHeader = props => {
  return (
    <Flex
      between
      middle
      variant='account.orders.header'
      {...props}
    >
      <Heading variant='account.text.orders.heading'>
        Order History
      </Heading>
    </Flex>
  );
};
