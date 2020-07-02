import React from 'react';

import { Flex } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoginForm } from '../components/LoginForm';


export const Login = props => {
  return (
    <AccountLayout
      loggedIn={false}
      {...props}
    >
      <Flex variant='layout.account.login'>
        <LoginForm />
      </Flex>
    </AccountLayout>
  );
};
