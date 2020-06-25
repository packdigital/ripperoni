import React, { useContext } from 'react';
import { Field, Input } from 'theme-ui';

import { Button, Flex, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';


export const LoginForm = ({
  recoverPasswordToggle,
  ...props
}) => {
  const { state, login } = useContext(CustomerContext);

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
    <Flex
      as='form'
      direction='column'
      variant='forms.account.login'
      onSubmit={event => {
        event.preventDefault();
        const { email: { value: email }, password: { value: password }} = event.target;

        login({ email, password });
      }}
      {...props}
    >
      <Field
        label='Email'
        name='email'
        as={EmailInput}
      />

      <Field
        label='Password'
        name='password'
        as={PasswordInput}
      />

      <Loader.Hoc loading={state.loading?.['customer-login']}>
        <Button.Link
          onClick={event => {
            event.preventDefault();
            recoverPasswordToggle();
          }}
          classname='recover-password-button'
        >
          Forgot Your Password?
        </Button.Link>

        <Button>
          Sign In
        </Button>
      </Loader.Hoc>
    </Flex>
  );
};
