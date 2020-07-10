import React from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';


export const AccountActivation = props => {
  return (
    <AccountLayout
      variant='account.layout.pages.accountActivation'
      loggedIn={false}
      {...props}
    >
      <Flex
        variant='account.pages.accountActivation'
        {...props}
      >
        Account Activation
      </Flex>
    </AccountLayout>
  );
};
