import React, { useContext } from 'react';

import { Flex } from '@ripperoni/components';

import { CustomerContext } from '../../context/CustomerContext';
import { OrderTableHeader } from './OrderTableHeader';
import { OrderTableRow } from './OrderTableRow';


export const OrderTable = props => {
  const { state } = useContext(CustomerContext);

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
