/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';

import { Box, Button, Flex, Heading } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import { RecoverPasswordForm } from '../components/RecoverPasswordForm';


export const LoginSignUp = props => {
  const [loginActive, setLoginActive] = useState(true);
  const [loginMessages, setLoginMessages] = useState({});
  const [recoverPasswordActive, setRecoverActive] = useState(false);
  const [recoverPasswordMessages, setRecoverMessages] = useState({});
  const [signupActive, setSignupActive] = useState(false);
  const [signupMessages, setSignupMessages] = useState({});

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
    <Flex direction={['column', 'row']}>
      <Flex display={[null, 'none']}>
        <Heading
          as={Button}
          onClick={loginToggle}
        >
          Sign In
        </Heading>

        <Heading
          as={Button}
          onClick={signupToggle}
        >
          Sign Up
        </Heading>
      </Flex>

      <Flex.Col
        pr={[0, 5]}
        width={['100%', '50%']}
        display={[!loginActive && 'none', 'flex']}
      >
        <Heading display={['none', 'block']}>
          Sign In
        </Heading>

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
        display={['none', 'block']}
        width='1px'
        sx={{ borderRight: '1px solid #000000' }}
      />

      <Flex.Col
        pl={[0, 5]}
        width={['100%', '50%']}
        display={[!signupActive && 'none', 'flex']}
      >
        <Heading display={['none', 'block']}>
          Sign In
        </Heading>

        <SignUpForm />
      </Flex.Col>
    </Flex>
  );
};
