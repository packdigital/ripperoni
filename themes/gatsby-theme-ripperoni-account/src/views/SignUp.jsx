import React from 'react';

import { Box, Flex, Heading, Link, Text } from '@ripperoni/components';
import { AccountLayout } from '@ripperoni/account/layout/AccountLayout';
import { SignupForm } from '@ripperoni/account/components/SignupForm';


export const Signup = props => {
  return (
    <AccountLayout
      variant='account.layout.pages.signup'
      loggedIn={false}
      {...props}
    >
      <Flex.Col
        center
        variant='account.pages.signup'
      >
        <Box variant='account.pages.signup.header'>
          <Heading variant='account.text.signup.heading'>
            Create an Account
          </Heading>
        </Box>

        <Box variant='account.pages.signup.content'>
          <SignupForm />
        </Box>

        <Flex
          between
          middle
          variant='account.pages.signup.login'
        >
          <Box variant='account.pages.signup.loginText'>
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
