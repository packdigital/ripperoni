import React from 'react';

import { Flex, Heading } from '@ripperoni/components';


export const OrdersHeader = props => {
  return (
    <Flex
      between
      middle
      variant='pages.account.orders.header'
      {...props}
    >
      <Heading variant='text.account.orders.heading'>
        Order History
      </Heading>
    </Flex>
  );
};
