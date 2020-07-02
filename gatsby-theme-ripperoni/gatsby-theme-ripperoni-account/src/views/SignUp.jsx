import React from 'react';

import { Flex } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { AccountLayout } from '../layout/AccountLayout';


export const SignUp = props => {
  return (
    <AccountLayout
      loggedIn={false}
      {...props}
    >
      <Flex
        variant='layout.account.signUp'
        {...props}
      >
        Signup
      </Flex>
    </AccountLayout>
  );
};
