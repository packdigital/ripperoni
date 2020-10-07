import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'theme-ui';
import { navigate } from 'gatsby';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';


export const ResetPasswordForm = ({
  customerId,
  resetToken,
  ...props
}) => {
  const { state, reset } = useCustomerContext();

  if (state.customer !== null) {
    navigate('/account/');
  }

  const PasswordInput = props => (
    <Input
      type='password'
      {...props}
    />
  );

  return (
    <Flex.Col
      data-comp={ResetPasswordForm.displayName}
      variant='account.forms.reset'
      as='form'
      onSubmit={event => {
        event.preventDefault();

        const { password: { value: password }} = event.target;

        reset({ password, customerId, resetToken });
      }}
      {...props}
    >
      <Flex variant='account.forms.reset.inputs'>
        <FieldGroup
          variant='account.forms.reset.password'
          label='Password'
          name='password'
          as={PasswordInput}
        />
      </Flex>

      <Flex variant='account.forms.reset.ctas'>
        <Loader.Hoc
          variant='account.forms.reset.loader'
          loading={state.loading?.passwordReset}
        >
          <Button variant='account.forms.reset.submit'>
            Submit
          </Button>
        </Loader.Hoc>
      </Flex>
    </Flex.Col>
  );
};

ResetPasswordForm.displayName = 'Reset Password Form';

ResetPasswordForm.propTypes = {
  customerId: PropTypes.string,
  resetToken: PropTypes.string,
};
