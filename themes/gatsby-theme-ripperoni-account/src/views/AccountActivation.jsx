import React from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';


export const AccountActivation = props => {
  return (
    <AccountLayout
      variant='account.layout.accountActivation'
      loggedIn={false}
      {...props}
    >
      <Flex
        variant='account.accountActivation'
        {...props}
      >
        Account Activation
      </Flex>
    </AccountLayout>
  );
};
