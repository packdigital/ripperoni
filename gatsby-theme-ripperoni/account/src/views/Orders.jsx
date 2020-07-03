import React from 'react';

import { Box } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoggedInPageHeader } from '../components/LoggedInPageHeader';
import { OrderTable } from '../components/OrderTable';


export const Orders = props => {
  return (
    <AccountLayout
      loggedIn={true}
      {...props}
    >
      <LoggedInPageHeader heading='Order History' />

      <Box variant='pages.account.orders.content'>
        <OrderTable />
      </Box>
    </AccountLayout>
  );
};
