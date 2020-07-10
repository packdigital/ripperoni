import React from 'react';

import { Flex } from '@ripperoni/components';

import { TableCell } from './OrderTableCell';


export const TableHeader = props => {
  return (
    <Flex
      between
      variant='account.pages.orders.table.header'
      {...props}
    >
      <TableCell variant='account.text.orders.table.header'>Order</TableCell>
      <TableCell variant='account.text.orders.table.header'>Date</TableCell>
      <TableCell variant='account.text.orders.table.header'>Status</TableCell>
      <TableCell variant='account.text.orders.table.header'>Total</TableCell>
    </Flex>
  );
};
