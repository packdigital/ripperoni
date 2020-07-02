import React, { useContext } from 'react';
import { Input } from 'theme-ui';

import { Button, FieldGroup, Flex, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';


export const SignUpForm = props => {
  const { state, create } = useContext(CustomerContext);

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
      variant='forms.account.signUp'
      onSubmit={event => {
        event.preventDefault();

        const {
          firstName: { value: firstName },
          lastName: { value: lastName },
          email: { value: email },
          password: { value: password },
        } = event.target;

        create({ firstName, lastName, email, password });
      }}
      {...props}
    >
      <FieldGroup
        variant='forms.account.signUp.fieldGroup'
        label='First Name'
        name='firstName'
        as={Input}
      />

      <FieldGroup
        variant='forms.account.signUp.fieldGroup'
        label='Last Name'
        name='lastName'
        as={Input}
      />

      <FieldGroup
        variant='forms.account.signUp.fieldGroup'
        label='Email'
        name='email'
        as={EmailInput}
      />

      <FieldGroup
        variant='forms.account.signUp.fieldGroup'
        label='Password'
        name='password'
        as={PasswordInput}
      />

      <Loader.Hoc loading={state.loading?.['customer-create']}>
        <Button>
          Sign Up
        </Button>
      </Loader.Hoc>
    </Flex>
  );
};
