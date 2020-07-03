/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';

import { Box, Button, Flex, Heading } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import { RecoverPasswordForm } from '../components/RecoverPasswordForm';


export const LoginSignUp = props => {
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
      loggedIn={false}
      {...props}
    >
      <Flex direction={['column', null, null, 'row']}>
        <Flex
          display={[null, null, null, 'none']}
          variant='pages.account.loginSignUp.header.mobile'
        >
          <Heading
            as={Button.Link}
            onClick={loginToggle}
            variant='text.account.loginSignUp.heading.mobile'
            borderColor={loginActive ? 'black' : 'gray'}
            borderBottomWidth='3px'
          >
            Sign In
          </Heading>

          <Heading
            as={Button.Link}
            onClick={signupToggle}
            variant='text.account.loginSignUp.heading.mobile'
            borderColor={signupActive ? 'black' : 'gray'}
            borderBottomWidth='3px'
          >
            Sign Up
          </Heading>
        </Flex>

        <Flex.Col
          variant='pages.account.loginSignUp.login'
          width={['100%', null, null, '50%']}
          display={[!loginActive && 'none', null, null, 'flex']}
        >
          <Flex
            variant='pages.account.loginSignUp.header.desktop'
            display={['none', null, null, 'block']}
          >
            <Heading variant='text.account.loginSignUp.heading.desktop'>
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
          variant='pages.account.loginSignUp.signUp'
          width={['100%', null, null, '50%']}
          display={[!signupActive && 'none', null, null, 'flex']}
        >
          <Flex
            variant='pages.account.loginSignUp.header.desktop'
            display={['none', null, null, 'block']}
          >
            <Heading variant='text.account.loginSignUp.heading.desktop'>
              Sign Up
            </Heading>
          </Flex>

          <SignUpForm />
        </Flex.Col>
      </Flex>
    </AccountLayout>
  );
};
