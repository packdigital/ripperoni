import React from 'react';

import { Flex, Price, Text } from '@ripperoni/components';


export const Totals = ({
  subtotal,
  shipping,
  tax,
  totalPrice,
  ...props
}) => (
  <Flex.Col
    width='180px'
    variant='pages.account.order.totals'
    {...props}
  >
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
