/**
 * @prettier
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { Flex } from '@ripperoni/components';
import { AccountLayout } from '@ripperoni/account/layout/AccountLayout';

import { OrderAddresses } from '../components/OrderAddresses';
import { OrderLineItems } from '../components/OrderLineItems';
import { OrderTotals } from '../components/OrderTotals';
import { OrderHeader } from '../components/OrderHeader';
import { useCustomerContext } from '../context/CustomerContext';

export const Order = ({ location, ...props }) => {
  const { state } = useCustomerContext();
  const order =
    location.state?.order ||
    state.customer.orders.find((order) => order.id == props.id);

  return (
    <AccountLayout variant='account.layout.order' loggedIn={true} {...props}>
      <OrderHeader order={order} />

      <Flex.Col variant='account.order.content'>
        <OrderAddresses
          shippingAddress={order.shippingAddress}
          fulfillment={order.fulfillments[0]}
        />

        <OrderLineItems
          statusUrl={order.statusUrl}
          lineItems={order.lineItems}
        />

        <OrderTotals
          subtotal={order.subtotalPrice}
          shipping={order.shippingPrice}
          tax={order.totalTax}
          totalPrice={order.totalPrice}
        />
      </Flex.Col>
    </AccountLayout>
  );
};
