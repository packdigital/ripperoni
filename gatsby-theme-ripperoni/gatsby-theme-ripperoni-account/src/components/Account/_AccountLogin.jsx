/** @jsx jsx */
import React, { useState } from 'react';
import { Button, Heading, jsx } from 'theme-ui';

import { Container, FlexCol, FlexMQ, FlexRow } from '@theme2/components';

import useCustomer from '@theme/hooks/useCustomer';

import CutsLoader from '@components/CutsLoader';
import { LoginMessage } from '@components/Account/AccountLoginMessage';
import { LoginInputGroup } from '@components/Account/AccountLoginInputGroup';


export const AccountLogin = props => {
  const actions = useCustomer();
  const [loginActive, setLoginActive] = useState(true);
  const [loginWaiting, setLoginWaiting] = useState(false);
  const [loginMessages, setLoginMessages] = useState({});
  const [resetActive, setResetActive] = useState(false);
  const [resetWaiting, setResetWaiting] = useState(false);
  const [resetMessages, setResetMessages] = useState(false);
  const [signupActive, setSignupActive] = useState(false);
  const [signupWaiting, setSignupWaiting] = useState(false);
  const [signupMessages, setSignupMessages] = useState({});

  const toggleForms = form => {
    if (form === 'login' && !loginActive) {
      setLoginActive(true);
      setSignupActive(false);
    }

    if (form === 'signup' && !signupActive) {
      setLoginActive(false);
      setSignupActive(true);
    }
  };

  const submitForm = async (event, action) => {
    event.preventDefault();

    try {
      const email = event.target.email?.value;
      const password = event.target.password?.value;
      const firstName = event.target.firstName?.value;
      const lastName = event.target.lastName?.value;
      const customerAction = actions[action];
      const data = { email, password, firstName, lastName };
      const response = await customerAction(data);

      if (response.data?.recover?.ok) {
        const messages = ['Check your email for a reset link.'];
        setLoginMessages({ messages, sentiment: 'good' });
        setResetWaiting(false);
        setResetActive(false);
      }

      if (!response.ok && action === 'login') {
        setLoginWaiting(false);
        setLoginMessages({ messages: response.errors });
      }

      if (!response.ok && action === 'forgot') {
        setResetWaiting(false);
        setResetMessages({ messages: response.errors });
      }

      if (!response.ok && action === 'create') {
        setSignupWaiting(false);
        setSignupMessages({ messages: response.errors });
      }
    } catch (error) {
      setLoginWaiting(false);
      setSignupWaiting(false);
      setResetWaiting(false);
    }
  };

  return (
    <React.Fragment>
      <Heading
        variant='text.heading.display'
        sx={{
          py: 12,
          bg: 'black',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Welcome to Cuts
      </Heading>

      <Container.Large
        contain
        center
      >
        <FlexMQ
          py={13}
          center={[true]}
          direction={['col', null, null, null, 'row']}
        >
          <FlexRow
            mb={9}
            sx={{ display: [null, null, null, null, 'none'] }}
          >
            <Heading
              mr={7}
              as={Button}
              sx={{
                ...mobileToggleSx,
                borderColor: !loginActive && 'rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => toggleForms('login')}
            >
              Sign In
            </Heading>
            <Heading
              as={Button}
              sx={{
                ...mobileToggleSx,
                borderColor: !signupActive && 'rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => toggleForms('signup')}
            >
              Sign Up
            </Heading>
          </FlexRow>

          <FlexCol
            sx={{
              width: ['100%', null, null, null, '50%'],
              pr: [0, null, null, null, '60px', '120px'],
              display: [!loginActive && 'none', null, null, null, 'flex'],
            }}
          >
            <Heading sx={desktopHeadingSx}>Sign In</Heading>

            {/* LOGIN */}
            <FlexCol
              as='form'
              sx={{
                width: '100%',
                display: resetActive ? 'none' : 'flex'
              }}
              onSubmit={event => {
                submitForm(event, 'login');
                setLoginWaiting(true);
              }}
            >

              <LoginInputGroup
                label='Email'
                name='email'
              />

              <LoginInputGroup
                label='Password'
                name='password'
                type='password'
              />

              <LoginMessage
                messages={loginMessages.messages}
                sentiment={loginMessages.sentiment}
              />

              {loginWaiting
                ? <CutsLoader color='dark' />
                : <Button>Sign In</Button>
              }

              <Button
                variant='link'
                mt={3}
                onClick={event => {
                  event.preventDefault();
                  setResetActive(true);
                }}
              >
                Forgot Your Password?
              </Button>
            </FlexCol>

            {/* RESET */}
            <FlexCol
              as='form'
              sx={{
                width: '100%',
                display: resetActive ? 'flex' : 'none'
              }}
              onSubmit={event => {
                submitForm(event, 'forgot');
                setResetWaiting(true);
              }}
            >
              <LoginInputGroup
                label='Email'
                name='email'
              />

              <LoginMessage
                messages={resetMessages.messages}
                sentiment={resetMessages.sentiment}
              />

              <FlexCol>
                <Button
                  sx={{
                    mb: 7,
                    variant: 'buttons.link',
                    textAlign: 'left',
                  }}
                  onClick={event => {
                    event.preventDefault();
                    setResetActive(false);
                  }}
                >
                  Cancel
                </Button>

                {resetWaiting
                  ? <CutsLoader color='dark' />
                  : <Button>Reset Password</Button>
                }
              </FlexCol>
            </FlexCol>
          </FlexCol>

          {/* SIGNUP */}
          <FlexCol
            as='form'
            sx={{
              width: ['100%', null, null, null, '50%'],
              pl: [0, null, null, null, '60px', '120px'],
              borderLeft: [null, null, null, null, '1px solid black'],
              display: [!signupActive && 'none', null, null, null, 'flex'],
            }}
            onSubmit={event => {
              submitForm(event, 'create');
              setSignupWaiting(true);
            }}
          >
            <Heading sx={desktopHeadingSx}>Sign Up</Heading>

            <LoginInputGroup
              label='First Name'
              name='firstName'
            />

            <LoginInputGroup
              label='Last Name'
              name='lastName'
            />

            <LoginInputGroup
              label='Email'
              name='email'
            />

            <LoginInputGroup
              label='Password'
              name='password'
              type='password'
            />

            <LoginMessage
              messages={signupMessages.messages}
              sentiment={signupMessages.sentiment}
            />

            {signupWaiting
              ? <CutsLoader color='dark' />
              : <Button>Sign Up</Button>
            }
          </FlexCol>

        </FlexMQ>
      </Container.Large>
    </React.Fragment>
  );
};

export default AccountLogin;

const desktopHeadingSx = {
  mb: 11,
  display: ['none', null, null, null, 'block'],
};

const mobileToggleSx = {
  variant: 'buttons.text',
  pb: 1,
  color: 'black',
  textDecoration: 'none',
  borderRadius: 0,
  borderBottom: '3px solid black',
  '&:hover': { bg: 'transparent' }
};
