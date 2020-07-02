import React, { useContext } from 'react';
import { Input } from 'theme-ui';

import { Button, FieldGroup, Flex, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';


export const RecoverPasswordForm = ({
  cancelToggle,
  ...props
}) => {
  const { state, recover } = useContext(CustomerContext);

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
      <FieldGroup
        variant='forms.account.recoverPassword.fieldGroup'
        as={EmailInput}
        label='Email'
        name='email'
      />

      <Loader.Hoc loading={state.loading?.['password-recover']}>
        <Button.Link
          sx={{ alignSelf: 'center' }}
          onClick={event => {
            event.preventDefault();
            cancelToggle();
          }}
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
