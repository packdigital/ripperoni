/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Input } from 'theme-ui';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

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
      variant='forms.account.login'
      direction='column'
      onSubmit={event => {
        event.preventDefault();
        const { email: { value: email }, password: { value: password }} = event.target;

        login({ email, password });
      }}
      {...props}
    >
      <FieldGroup
        variant='forms.account.login.fieldGroup'
        label='Email'
        name='email'
        as={EmailInput}
      />

      <FieldGroup
        variant='forms.account.login.fieldGroup'
        label='Password'
        name='password'
        as={PasswordInput}
      />

      <Loader.Hoc loading={state.loading?.customerLogin}>
        <Button.Link
          sx={{ alignSelf: 'center' }}
          onClick={event => {
            event.preventDefault();
            recoverPasswordToggle();
          }}
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
