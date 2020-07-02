import React from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';


export const AccountActivation = props => {
  return (
    <AccountLayout
      loggedIn={false}
      {...props}
    >
      <Flex
        variant='layout.account.accountActivation'
        {...props}
      >
        Account Activation
      </Flex>
    </AccountLayout>
  );
};
