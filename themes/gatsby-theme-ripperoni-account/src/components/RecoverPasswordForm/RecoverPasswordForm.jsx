import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { Email } from './Email';
import { AccountFormMessage } from '../AccountFormMessage';
import { useCustomerContext } from '../../context/CustomerContext';

export const RecoverPasswordForm = ({
  cancelToggle = false,
  placeholders = {
    email: 'Email',
  },
  ...props
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { state, recoverPassword } = useCustomerContext();

  return (
    <Flex.Col
      data-comp={RecoverPasswordForm.displayName}
      as='form'
      variant='account.forms.recover'
      onSubmit={(event) => {
        event.preventDefault();
        const email = event.target.email.value;

        recoverPassword({ email });

        setIsSubmitted(true);
      }}
      {...props}
    >
      <Loader.Hoc
        variant='account.forms.recover.loader'
        loading={state.loading?.passwordRecover}
      >
        {!isSubmitted ? (
          <>
            <Flex variant='account.forms.recover.inputs'>
              <FieldGroup
                variant='account.forms.recover.email'
                as={Email}
                label='Email'
                name='email'
                placeholder={placeholders.email}
                id='recover-password-email'
              />
            </Flex>

            <Flex variant='account.forms.recover.ctas'>
              <Button variant='account.forms.recover.submit'>Submit</Button>

              {cancelToggle && (
                <Button
                  variant='account.forms.recover.cancel'
                  onClick={(event) => {
                    event.preventDefault();

                    cancelToggle();
                  }}
                >
                  Cancel
                </Button>
              )}
            </Flex>
          </>
        ) : (
          <>
            <AccountFormMessage
              heading='Success!'
              sentiment='success'
              messages={['Please check your email for a password reset link']}
            />

            {cancelToggle && (
              <Button
                variant='account.forms.recover.cancel'
                onClick={(event) => {
                  event.preventDefault();

                  cancelToggle();
                }}
              >
                Go Back
              </Button>
            )}
          </>
        )}
      </Loader.Hoc>
    </Flex.Col>
  );
};

RecoverPasswordForm.displayName = 'Recover Password Form';

RecoverPasswordForm.propTypes = {
  cancelToggle: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  placeholders: PropTypes.shape({
    email: PropTypes.string,
  }),
};
