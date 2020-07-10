import React from 'react';

import { Flex } from '@ripperoni/components';

import { TableRow } from './OrderTableRow';
import { TableHeader } from './OrderTableHeader';
import { useCustomerContext } from '../../context/CustomerContext';


export const OrderTable = props => {
  const { state } = useCustomerContext();

  return (
    <Flex.Col
      variant='account.pages.orders.table'
      {...props}
    >
      <TableHeader />

      {state.customer.orders.map((order, index) => (
        <TableRow
          order={order}
          key={index}
        />
      ))}
    </Flex.Col>
  );
};
