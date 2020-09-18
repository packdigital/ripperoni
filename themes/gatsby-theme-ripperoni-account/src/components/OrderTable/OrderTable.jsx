/**
 * @prettier
 */

import React from 'react';

import { Flex } from '@ripperoni/components';

import { TableRow } from './OrderTableRow';
import { TableHeaderRow } from './OrderTableHeaderRow';
import { useCustomerContext } from '../../context/CustomerContext';

export const OrderTable = (props) => {
  const { state } = useCustomerContext();

  return (
    <Flex.Col variant='account.orders.table' {...props}>
      <TableHeaderRow />

      {state.customer.orders.map((order, index) => (
        <TableRow order={order} key={index} />
      ))}
    </Flex.Col>
  );
};
