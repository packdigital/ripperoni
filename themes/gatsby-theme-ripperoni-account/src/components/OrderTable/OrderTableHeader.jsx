import React from 'react';

import { Flex } from '@ripperoni/components';

import { OrderTableCell as Cell } from './OrderTableCell';


export const OrderTableHeader = props => {
  return (
    <Flex
      between
      variant='pages.account.orders.table.header'
      {...props}
    >
      <Cell variant='text.account.orders.table.header'>Order</Cell>
      <Cell variant='text.account.orders.table.header'>Date</Cell>
      <Cell variant='text.account.orders.table.header'>Status</Cell>
      <Cell variant='text.account.orders.table.header'>Total</Cell>
    </Flex>
  );
};
