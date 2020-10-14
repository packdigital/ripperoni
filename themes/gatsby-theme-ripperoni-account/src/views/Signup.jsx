import React from 'react';

import { Box, Flex, Heading, Link, Text } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { SignupForm } from '../components/SignupForm';


export const Signup = props => {
  return (
    <AccountLayout
      variant='account.layout.signup'
      loggedIn={false}
      {...props}
    >
      <Flex.Col
        data-comp={Signup.displayName}
        center
        variant='account.signup'
      >
        <Box variant='account.signup.header'>
          <Heading variant='account.text.signup.heading'>
            Create an Account
          </Heading>
        </Box>

        <Box variant='account.signup.content'>
          <SignupForm />
        </Box>

        <Flex
          between
          middle
          variant='account.signup.login'
        >
          <Box variant='account.signup.loginText'>
            <Text variant='account.text.signup.loginText'>
              Already have an account?
            </Text>
          </Box>

          <Link
            to='/account/login/'
            variant='account.text.signup.loginLink'
            sx={{ variant: 'account.text.signup.loginLink' }}
          >
            Login Here
          </Link>
        </Flex>
      </Flex.Col>
    </AccountLayout>
  );
};

Signup.displayName = 'Signup';
