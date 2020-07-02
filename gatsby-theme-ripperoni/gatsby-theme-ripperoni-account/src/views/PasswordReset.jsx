import React from 'react';

import { Flex } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

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
