import React from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';


export const PasswordReset = props => {
  return (
    <AccountLayout
      loggedIn={false}
      {...props}
    >
      <Flex
        variant='layout.account.passwordReset'
        {...props}
      >
        Password Reset
      </Flex>
    </AccountLayout>
  );
};
