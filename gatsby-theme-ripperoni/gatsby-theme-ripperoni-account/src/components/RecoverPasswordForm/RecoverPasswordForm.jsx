import React, { useContext } from 'react';
import { Field, Input } from 'theme-ui';

import { Button, Flex, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';


export const RecoverPasswordForm = ({
  cancelToggle,
  ...props
}) => {
  const { customer, recover } = useContext(CustomerContext);

  const EmailInput = props => (
    <Input
      type='email'
      {...props}
    />
  );

  return (
    <Flex
      as='form'
      direction='column'
      variant='forms.account.recover'
      onSubmit={event => {
        event.preventDefault();
        const { email: { value: email }} = event.target;

        recover({ email });
      }}
      {...props}
    >
      <Field
        as={EmailInput}
        label='Email'
        name='email'
      />

      <Loader.Hoc loading={customer.loading?.['password-recover']}>
        <Button.Link
          onClick={event => {
            event.preventDefault();
            cancelToggle();
          }}
          classname='cancel-recover-password-button'
        >
          Cancel
        </Button.Link>

        <Button>
          Reset Password
        </Button>
      </Loader.Hoc>
    </Flex>
  );
};
