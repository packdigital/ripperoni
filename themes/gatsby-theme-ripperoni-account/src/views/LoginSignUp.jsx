/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';

import { Box, Button, Flex, Heading } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import { RecoverPasswordForm } from '../components/RecoverPasswordForm';


export const LoginSignup = props => {
  const [loginActive, setLoginActive] = useState(true);
  // const [loginMessages, setLoginMessages] = useState({});
  const [recoverPasswordActive, setRecoverActive] = useState(false);
  // const [recoverPasswordMessages, setRecoverMessages] = useState({});
  const [signupActive, setSignupActive] = useState(false);
  // const [signupMessages, setSignupMessages] = useState({});

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
      variant='account.layout.pages.loginSignup'
      loggedIn={false}
      {...props}
    >
      <Flex variant='account.pages.loginSignup'>
        <Flex variant='account.pages.loginSignup.header.mobile'>
          <Heading
            as={Button.Link}
            onClick={loginToggle}
            variant='account.text.loginSignup.heading.mobile'
            borderColor={loginActive ? 'black' : 'gray'}
            borderBottomWidth='3px'
          >
            Sign In
          </Heading>

          <Heading
            as={Button.Link}
            onClick={signupToggle}
            variant='account.text.loginSignup.heading.mobile'
            borderColor={signupActive ? 'black' : 'gray'}
            borderBottomWidth='3px'
          >
            Sign Up
          </Heading>
        </Flex>

        <Flex.Col
          variant='account.pages.loginSignup.login'
          display={[!loginActive && 'none', null, null, 'flex']}
        >
          <Flex variant='account.pages.loginSignup.header.desktop'>
            <Heading variant='account.text.loginSignup.heading.desktop'>
              Sign In
            </Heading>
          </Flex>

          <LoginForm
            sx={{ display: recoverPasswordActive ? 'none' : 'flex' }}
            recoverPasswordToggle={recoverPasswordToggle}
          />

          <RecoverPasswordForm
            sx={{ display: recoverPasswordActive ? 'flex' : 'none' }}
            cancelToggle={loginToggle}
          />
        </Flex.Col>

        <Box
          width='1px'
          display={['none', null, null, 'block']}
          sx={{
            borderColor: 'black',
            borderRight: '1px solid',
          }}
        />

        <Flex.Col
          variant='account.pages.loginSignup.signup'
          display={[!signupActive && 'none', null, null, 'flex']}
        >
          <Flex variant='account.pages.loginSignup.header.desktop'>
            <Heading variant='account.text.loginSignup.heading.desktop'>
              Sign Up
            </Heading>
          </Flex>

          <SignupForm />
        </Flex.Col>
      </Flex>
    </AccountLayout>
  );
};
