import React from 'react';
import { navigate } from 'gatsby';

import { Box, Flex, Heading, Link, Text } from '@ripperoni/components';
import { AccountLayout } from '@ripperoni/account/layout/AccountLayout';
import { LoginForm } from '@ripperoni/account/components/LoginForm';


export const Login = props => {
  const recoverPasswordToggle = () => {
    navigate('/account/recover/');
  };

  return (
    <AccountLayout
      variant='account.layout.pages.login'
      loggedIn={false}
      {...props}
    >
      <Flex.Col
        data-comp={Login.displayName}
        center
        variant='account.pages.login'
      >
        <Box variant='account.pages.login.header'>
          <Heading variant='account.text.login.heading'>
            Sign In to Your Account
          </Heading>
        </Box>

        <Box variant='account.pages.login.content'>
          <LoginForm recoverPasswordToggle={recoverPasswordToggle} />
        </Box>

        <Flex
          between
          middle
          variant='account.pages.login.createAccount'
        >
          <Box variant='account.pages.login.signupText'>
            <Text variant='account.text.login.signupText'>
              Don't have an account?
            </Text>
          </Box>

          <Link
            to='/account/signup/'
            variant='account.text.login.signupLink'
            sx={{ variant: 'account.text.login.signupLink' }}
          >
            Sign up here
          </Link>
        </Flex>
      </Flex.Col>
    </AccountLayout>
  );
};

Login.displayName = 'Login';
