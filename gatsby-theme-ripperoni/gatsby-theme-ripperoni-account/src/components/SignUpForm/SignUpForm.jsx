import React, { useContext } from 'react';
import { Field, Input } from 'theme-ui';

import { Button, Flex, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';


export const SignUpForm = props => {
  const { customer, create } = useContext(CustomerContext);

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
      <Field
        label='First Name'
        name='firstName'
        as={Input}
      />

      <Field
        label='Last Name'
        name='lastName'
        as={Input}
      />

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

      <Loader.Hoc loading={customer.loading?.['customer-create']}>
        <Button>
          Sign Up
        </Button>
      </Loader.Hoc>
    </Flex>
  );
};
