import React from 'react';
import { navigate } from 'gatsby';

import { Box, Flex, Heading, Link, Text } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { RecoverPasswordForm } from '../components/RecoverPasswordForm';

export const RecoverPassword = (props) => {
  const cancelToggle = () => {
    navigate('/account/login/');
  };

  return (
    <AccountLayout variant='account.layout.recover' loggedIn={false} {...props}>
      <Flex.Col
        data-comp={RecoverPassword.displayName}
        center
        variant='account.recover'
      >
        <Box variant='account.recover.header'>
          <Heading variant='account.text.recover.heading'>
            Forgot Password
          </Heading>
        </Box>

        <Box variant='account.recover.content'>
          <RecoverPasswordForm cancelToggle={cancelToggle} />
        </Box>

        <Flex between middle variant='account.recover.createAccount'>
          <Box variant='account.recover.signupText'>
            <Text variant='account.text.recover.signupText'>
              Don't have an account?
            </Text>
          </Box>

          <Link
            to='/account/signup/'
            variant='account.text.recover.signupLink'
            sx={{ variant: 'account.text.recover.signupLink' }}
          >
            Sign up here
          </Link>
        </Flex>
      </Flex.Col>
    </AccountLayout>
  );
};

RecoverPassword.displayName = 'Recover Password';
