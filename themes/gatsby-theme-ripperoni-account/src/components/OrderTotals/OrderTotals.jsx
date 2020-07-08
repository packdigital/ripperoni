/* eslint-disable react/prop-types */
import React from 'react';

import { Flex, Price, Text } from '@ripperoni/components';


export const Totals = ({
  subtotal,
  shipping,
  tax,
  totalPrice,
  ...props
}) => (
  <Flex
    variant='pages.account.order.totals'
    right
    {...props}
  >
    <Flex.Col width='180px'>
      {subtotal && (
        <Line
          name='Subtotal:'
          amount={subtotal.amount}
        />
      )}

      {shipping && (
        <Line
          name='Shipping:'
          amount={shipping.amount}
        />
      )}

      {tax && (
        <Line
          name='Tax:'
          amount={tax.amount}
        />
      )}

      {totalPrice && (
        <Line
          variant='pages.account.order.totalPrice'
          name='Total:'
          amount={totalPrice.amount}
        />
      )}
    </Flex.Col>
  </Flex>
);

Totals.displayName = 'Order Totals';

const Line = ({
  name,
  amount,
  ...props
}) => (
  <Flex
    right
    width='100%'
    variant='pages.account.order.total'
    {...props}
  >
    <Text
      flex='1'
      variant='text.account.order.total'
    >
      {name}
    </Text>

    <Price variant='text.account.order.total'>
      {amount}
    </Price>
  </Flex>
);
