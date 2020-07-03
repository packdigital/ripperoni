/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { Date, Flex, Heading, Link, Svg } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoggedInPageHeader } from '../components/LoggedInPageHeader';
import { Addresses } from '../components/OrderAddresses';
import { LineItems } from '../components/OrderLineItems';
import { Totals } from '../components/OrderTotals';
import { CustomerContext } from '../context/CustomerContext';
import Arrow from '../assets/images/arrow.svg';


export const Order = ({
  location,
  ...props
}) => {
  const { state } = useContext(CustomerContext);
  const order = location.state?.order || state.customer.orders.find(order => order.id == props.id);

  return (
    <AccountLayout
      loggedIn={true}
      {...props}
    >
      <LoggedInPageHeader>
        <Link
          to='/account/'
          animate={false}
        >
          <Flex>
            <Svg
              as={Arrow}
              mr='5px'
              width='15px'
            />

            <Heading variant='text.account.loggedInPageHeader.heading'>
              {`Order #${order.id}`}
            </Heading>
          </Flex>
        </Link>

        <Date
          variant='text.account.order.date'
          format='ddd, mmm dS, yyyy'
        >
          {order.date}
        </Date>
      </LoggedInPageHeader>

      <Flex.Col variant='pages.account.order.content'>
        <Addresses
          variant='pages.account.order.addresses'
          shippingAddress={order.shippingAddress}
          fulfillment={order.fulfillments[0]}
        />

        <LineItems
          statusUrl={order.statusUrl}
          lineItems={order.lineItems}
        />

        <Totals
          alignSelf='flex-end'
          subtotal={order.subtotalPrice}
          shipping={order.shippingPrice}
          tax={order.totalTax}
          totalPrice={order.totalPrice}
        />
      </Flex.Col>
    </AccountLayout>
  );
};
