import React from 'react';

import { Flex } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { OrderTableCell as Cell } from './OrderTableCell';


export const OrderTableHeader = props => {
  return (
    <Flex
      between
      variant='pages.account.orders.table.header'
      {...props}
    >
      <Cell>Order</Cell>
      <Cell>Date</Cell>
      <Cell>Status</Cell>
      <Cell>Total</Cell>
    </Flex>
  );
};
