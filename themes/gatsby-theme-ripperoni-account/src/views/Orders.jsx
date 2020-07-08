import React from 'react';

import { Box } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { OrdersHeader } from '../components/OrdersHeader';
import { OrderTable } from '../components/OrderTable';


export const Orders = props => {
  return (
    <AccountLayout
      loggedIn={true}
      {...props}
    >
      <OrdersHeader />

      <Box variant='pages.account.orders.content'>
        <OrderTable />
      </Box>
    </AccountLayout>
  );
};
