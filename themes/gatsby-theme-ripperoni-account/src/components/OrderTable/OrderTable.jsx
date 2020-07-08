import React from 'react';

import { Flex } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';
import { OrderTableHeader } from './OrderTableHeader';
import { OrderTableRow } from './OrderTableRow';


export const OrderTable = props => {
  const { state } = useCustomerContext();

  return (
    <Flex.Col
      variant='pages.account.orders.table'
      {...props}
    >
      <OrderTableHeader />

      {state.customer.orders.map((order, index) => (
        <OrderTableRow
          order={order}
          key={index}
        />
      ))}
    </Flex.Col>
  );
};
