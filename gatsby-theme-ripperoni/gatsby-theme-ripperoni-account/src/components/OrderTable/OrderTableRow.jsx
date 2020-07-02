import React from 'react';

import { Date, Flex, Link, Price } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { OrderTableCell as Cell } from './OrderTableCell';


export const OrderTableRow = ({
  order,
  ...props
}) => {
  return (
    <Flex
      variant='pages.account.orders.table.row'
      between
      {...props}
    >
      <Cell>
        <Link
          to={`/account/orders/${order.id}`}
          state={{ order }}
          animate={false}
        >
          #{order.id}
        </Link>
      </Cell>
      <Cell
        as={Date}
        format='dd-mm-yy'
      >
        {order.date}
      </Cell>
      <Cell>
        {order.status.toLowerCase()}
      </Cell>
      <Cell as={Price}>
        {order.totalPrice.amount}
      </Cell>
    </Flex>
  );
};
