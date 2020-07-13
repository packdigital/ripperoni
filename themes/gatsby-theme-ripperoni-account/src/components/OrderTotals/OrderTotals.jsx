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
    data-comp={Totals.displayName}
    variant='account.pages.order.totals'
    right
    {...props}
  >
    <Flex.Col width='180px'>
      {subtotal && (
        <Line
          variant='account.pages.order.totals.subtotal'
          name='Subtotal:'
          amount={subtotal.amount}
        />
      )}

      {shipping && (
        <Line
          variant='account.pages.order.totals.shipping'
          name='Shipping:'
          amount={shipping.amount}
        />
      )}

      {tax && (
        <Line
          variant='account.pages.order.totals.tax'
          name='Tax:'
          amount={tax.amount}
        />
      )}

      {totalPrice && (
        <Line
          variant='account.pages.order.totals.total'
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
    data-comp={Line.displayName}
    right
    width='100%'
    variant='account.pages.order.totals.line'
    {...props}
  >
    <Text
      flex='1'
      variant='account.text.order.totals.line.title'
    >
      {name}
    </Text>

    <Price variant='account.text.order.totals.line.price'>
      {amount}
    </Price>
  </Flex>
);

Line.displayName = 'Order Totals Line';
