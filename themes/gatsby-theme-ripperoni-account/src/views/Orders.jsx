import React from 'react';

import { Box } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { OrdersHeader } from '../components/OrdersHeader';
import { OrderTable } from '../components/OrderTable';


export const Orders = props => {
  return (
    <AccountLayout
      variant='account.layout.pages.orders'
      loggedIn={true}
      {...props}
    >
      <OrdersHeader />

      <Box variant='account.pages.orders.content'>
        <OrderTable />
      </Box>
    </AccountLayout>
  );
};
