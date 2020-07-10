/* eslint-disable react/prop-types */
import React from 'react';

import { Flex } from '@ripperoni/components';
import { AccountLayout } from '@ripperoni/account/layout/AccountLayout';
import { Addresses } from '@ripperoni/account/components/OrderAddresses';
import { LineItems } from '@ripperoni/account/components/OrderLineItems';
import { Totals } from '@ripperoni/account/components/OrderTotals';
import { OrderHeader } from '@ripperoni/account/components/OrderHeader';
import { useCustomerContext } from '@ripperoni/account/context/CustomerContext';


export const Order = ({
  location,
  ...props
}) => {
  const { state } = useCustomerContext();
  const order = location.state?.order || state.customer.orders.find(order => order.id == props.id);

  return (
    <AccountLayout
      variant='account.layout.pages.order'
      loggedIn={true}
      {...props}
    >
      <OrderHeader order={order} />

      <Flex.Col variant='account.pages.order.content'>
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
