import React from 'react';

import { Flex } from '@ripperoni/components';

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
