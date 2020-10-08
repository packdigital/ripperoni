import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'theme-ui';
import { navigate } from 'gatsby';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';


export const LoginForm = ({
  recoverPasswordToggle = false,
  placeholders = {},
  forgotPasswordLabel,
  ...props
}) => {
  const { state, login } = useCustomerContext();

  if (state.customer !== null) {
    navigate('/account/');
  }

  const EmailInput = props => (
    <Input
      type='email'
      {...props}
    />
  );

  const PasswordInput = props => (
    <Input
      type='password'
      {...props}
    />
  );

  return (
    <Flex.Col
      data-comp={LoginForm.displayName}
      variant='account.forms.login'
      as='form'
      onSubmit={event => {
        event.preventDefault();

        const {
          email: { value: email },
          password: { value: password }
        } = event.target;

        login({ email, password });
      }}
      {...props}
    >
      <Flex variant='account.forms.login.inputs'>
        <FieldGroup
          variant='account.forms.login.email'
          label='Email'
          name='email'
          placeholder={placeholders.email}
          as={EmailInput}
          id='login-email'
        />

        <FieldGroup
          variant='account.forms.login.password'
          label='Password'
          name='password'
          placeholder={placeholders.password}
          as={PasswordInput}
          id='login-password'
        />
      </Flex>

      <Flex variant='account.forms.login.ctas'>
        <Loader.Hoc
          variant='account.forms.login.loader'
          loading={state.loading?.customerLogin}
        >
          <Button variant='account.forms.login.submit'>
            Sign In
          </Button>

          {recoverPasswordToggle && (
            <Button
              variant='account.forms.login.recoverPassword'
              onClick={event => {
                event.preventDefault();
                recoverPasswordToggle();
              }}
            >
              {forgotPasswordLabel || 'Forgot Your Password?'}
            </Button>
          )}
        </Loader.Hoc>
      </Flex>
    </Flex.Col>
  );
};

LoginForm.displayName = 'Login Form';

LoginForm.propTypes = {
  recoverPasswordToggle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  placeholders: PropTypes.object,
  forgotPasswordLabel: PropTypes.string,
};
