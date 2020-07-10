import React from 'react';
import { Input } from 'theme-ui';
import { navigate } from 'gatsby';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';


export const SignupForm = props => {
  const { state, create } = useCustomerContext();

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
      data-comp={SignupForm.displayName}
      variant='account.forms.signup'
      as='form'
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
      <Flex.Col variant='account.forms.signup.inputs'>
        <FieldGroup
          variant='account.forms.signup.firstName'
          label='First Name'
          name='firstName'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.signup.lastName'
          label='Last Name'
          name='lastName'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.signup.email'
          label='Email'
          name='email'
          as={EmailInput}
        />

        <FieldGroup
          variant='account.forms.signup.password'
          label='Password'
          name='password'
          as={PasswordInput}
        />
      </Flex.Col>

      <Flex.Col variant='account.forms.signup.ctas'>
        <Loader.Hoc
          variant='account.forms.signup.loader'
          loading={state.loading?.customerCreate}
        >
          <Button variant='account.forms.signup.submit'>
            Sign Up
          </Button>
        </Loader.Hoc>
      </Flex.Col>
    </Flex.Col>
  );
};

SignupForm.displayName = 'Signup Form';
