import React from 'react';
import { navigate } from 'gatsby';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { Email } from './Email';
import { Password } from './Password';
import { FirstName } from './FirstName';
import { LastName } from './LastName';
import { AccountFormMessage } from '../AccountFormMessage';
import { useCustomerContext } from '../../context/CustomerContext';


export const SignupForm = props => {
  const { state, createCustomer } = useCustomerContext();

  if (state.customer !== null) {
    navigate('/account/');
  }

  return (
    <Flex.Col
      data-comp={SignupForm.displayName}
      variant='account.forms.signup'
      as='form'
      onSubmit={event => {
        event.preventDefault();
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createCustomer({ firstName, lastName, email, password });
      }}
      {...props}
    >
      <Flex.Col variant='account.forms.signup.inputs'>
        <FieldGroup
          variant='account.forms.signup.firstName'
          label='First Name'
          name='firstName'
          as={FirstName}
          id='signup-first-name'
        />

        <FieldGroup
          variant='account.forms.signup.lastName'
          label='Last Name'
          name='lastName'
          as={LastName}
          id='signup-last-name'
        />

        <FieldGroup
          variant='account.forms.signup.email'
          label='Email'
          name='email'
          as={Email}
          id='signup-email'
        />

        <FieldGroup
          variant='account.forms.signup.password'
          label='Password'
          name='password'
          as={Password}
          id='signup-password'
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

        <AccountFormMessage messages={state.errors?.customerCreate} />
      </Flex.Col>
    </Flex.Col>
  );
};

SignupForm.displayName = 'Signup Form';
