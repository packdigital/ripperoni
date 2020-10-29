/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';

import { Box, Button, Divider, Flex, Heading } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import { RecoverPasswordForm } from '../components/RecoverPasswordForm';

export const LoginSignup = (props) => {
  const [loginActive, setLoginActive] = useState(true);
  const [recoverPasswordActive, setRecoverActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);

  const loginToggle = () => {
    setLoginActive(true);
    setRecoverActive(false);
    setSignupActive(false);
  };

  const recoverPasswordToggle = () => {
    setRecoverActive(true);
  };

  const signupToggle = () => {
    setLoginActive(false);
    setSignupActive(true);
  };

  return (
    <AccountLayout
      variant='account.layout.loginSignup'
      loggedIn={false}
      {...props}
    >
      <Flex variant='account.loginSignup'>
        <Flex variant='account.loginSignup.header.mobile'>
          <Box variant='account.loginSignup.header.mobile.loginToggle'>
            <Heading
              as={Button.Link}
              onClick={loginToggle}
              variant='account.text.loginSignup.heading.mobile'
              borderColor={loginActive ? 'black' : 'gray'}
              borderBottomWidth='3px'
            >
              Sign In
            </Heading>
          </Box>

          <Box variant='account.loginSignup.header.mobile.signupToggle'>
            <Heading
              as={Button.Link}
              onClick={signupToggle}
              variant='account.text.loginSignup.heading.mobile'
              borderColor={signupActive ? 'black' : 'gray'}
              borderBottomWidth='3px'
            >
              Sign Up
            </Heading>
          </Box>
        </Flex>

        <Flex.Col
          variant='account.loginSignup.login'
          display={[!loginActive && 'none', null, null, 'flex']}
        >
          <Box variant='account.loginSignup.header.desktop'>
            <Heading variant='account.text.loginSignup.heading.desktop'>
              Sign In
            </Heading>
          </Box>

          <LoginForm
            sx={{ display: recoverPasswordActive ? 'none' : 'flex' }}
            recoverPasswordToggle={recoverPasswordToggle}
          />

          <RecoverPasswordForm
            sx={{ display: recoverPasswordActive ? 'flex' : 'none' }}
            cancelToggle={loginToggle}
          />
        </Flex.Col>

        <Divider vertical display={['none', null, null, 'block']} />

        <Flex.Col
          variant='account.loginSignup.signup'
          display={[!signupActive && 'none', null, null, 'flex']}
        >
          <Box variant='account.loginSignup.header.desktop'>
            <Heading variant='account.text.loginSignup.heading.desktop'>
              Sign Up
            </Heading>
          </Box>

          <SignupForm />
        </Flex.Col>
      </Flex>
    </AccountLayout>
  );
};
