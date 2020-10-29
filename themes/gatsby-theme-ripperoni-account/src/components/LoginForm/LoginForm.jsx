import React from 'react';
import PropTypes from 'prop-types';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { Email } from './Email';
import { Password } from './Password';
import { AccountFormMessage } from '../AccountFormMessage';
import { useCustomerContext } from '../../context/CustomerContext';

export const LoginForm = ({
  recoverPasswordToggle = false,
  placeholders = {
    email: 'Email',
    password: 'Password',
  },
  forgotPasswordLabel = 'Forgot Your Password?',
  ...props
}) => {
  const { state, loginCustomer } = useCustomerContext();

  return (
    <Flex.Col
      data-comp={LoginForm.displayName}
      variant='account.forms.login'
      as='form'
      onSubmit={(event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        loginCustomer({ email, password });
      }}
      {...props}
    >
      <Flex variant='account.forms.login.inputs'>
        <FieldGroup
          variant='account.forms.login.email'
          label='Email'
          name='email'
          as={Email}
          placeholder={placeholders.email}
          id='login-email'
        />

        <FieldGroup
          variant='account.forms.login.password'
          label='Password'
          name='password'
          as={Password}
          placeholder={placeholders.password}
          id='login-password'
        />
      </Flex>

      <Flex variant='account.forms.login.ctas'>
        <Loader.Hoc
          variant='account.forms.login.loader'
          loading={state.loading?.customerLogin}
        >
          <Button variant='account.forms.login.submit'>Sign In</Button>

          {recoverPasswordToggle && (
            <Button
              variant='account.forms.login.recoverPassword'
              onClick={(event) => {
                event.preventDefault();
                recoverPasswordToggle();
              }}
            >
              {forgotPasswordLabel}
            </Button>
          )}

          <AccountFormMessage messages={state.errors?.customerLogin} />
        </Loader.Hoc>
      </Flex>
    </Flex.Col>
  );
};

LoginForm.displayName = 'Login Form';

LoginForm.propTypes = {
  recoverPasswordToggle: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  placeholders: PropTypes.object,
  forgotPasswordLabel: PropTypes.string,
};
