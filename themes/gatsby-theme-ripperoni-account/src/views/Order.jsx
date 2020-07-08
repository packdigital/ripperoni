/* eslint-disable react/prop-types */
import React from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { Addresses } from '../components/OrderAddresses';
import { LineItems } from '../components/OrderLineItems';
import { Totals } from '../components/OrderTotals';
import { OrderHeader } from '../components/OrderHeader';
import { useCustomerContext } from '../context/CustomerContext';


export const Order = ({
  location,
  ...props
}) => {
  const { state } = useCustomerContext();
  const order = location.state?.order || state.customer.orders.find(order => order.id == props.id);

  return (
    <AccountLayout
      loggedIn={true}
      {...props}
    >

      <OrderHeader order={order} />

      <Flex.Col variant='pages.account.order.content'>
        <Addresses
          shippingAddress={order.shippingAddress}
          fulfillment={order.fulfillments[0]}
        />

        <LineItems
          statusUrl={order.statusUrl}
          lineItems={order.lineItems}
        />

        <Totals
          subtotal={order.subtotalPrice}
          shipping={order.shippingPrice}
          tax={order.totalTax}
          totalPrice={order.totalPrice}
        />
      </Flex.Col>
    </AccountLayout>
  );
};
