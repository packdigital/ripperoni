import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'theme-ui';
import { navigate } from 'gatsby';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';


export const RecoverPasswordForm = ({
  cancelToggle = false,
  placeholders = {
    email: 'Email',
  },
  ...props
}) => {
  const { state, recover } = useCustomerContext();

  if (state.customer !== null) {
    navigate('/account/');
  }

  const EmailInput = props => (
    <Input
      type='email'
      {...props}
    />
  );

  return (
    <Flex.Col
      data-comp={RecoverPasswordForm.displayName}
      as='form'
      variant='account.forms.recover'
      onSubmit={event => {
        event.preventDefault();

        const { email: { value: email }} = event.target;

        recover({ email });
      }}
      {...props}
    >
      <Flex variant='account.forms.recover.inputs'>
        <FieldGroup
          variant='account.forms.recover.email'
          as={EmailInput}
          label='Email'
          name='email'
          placeholder={placeholders.email}
          id='recover-password-email'
        />
      </Flex>

      <Flex variant='account.forms.recover.ctas'>
        <Loader.Hoc
          variant='account.forms.recover.loader'
          loading={state.loading?.passwordRecover}
        >
          {cancelToggle && (
            <Button
              variant='account.forms.recover.cancel'
              onClick={event => {
                event.preventDefault();

                cancelToggle();
              }}
            >
              Cancel
            </Button>
          )}

          <Button variant='account.forms.recover.submit'>
            Submit
          </Button>
        </Loader.Hoc>
      </Flex>
    </Flex.Col>
  );
};

RecoverPasswordForm.displayName = 'Recover Password Form';

RecoverPasswordForm.propTypes = {
  cancelToggle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  placeholders: PropTypes.shape({
    email: PropTypes.string,
  }),
};
