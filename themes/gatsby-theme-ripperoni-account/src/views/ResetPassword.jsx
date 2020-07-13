import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Heading } from '@ripperoni/components';
import { AccountLayout } from '@ripperoni/account/layout/AccountLayout';
import { ResetPasswordForm } from '@ripperoni/account/components/ResetPasswordForm';


export const ResetPassword = ({
  customerId,
  resetToken,
  ...props
}) => {
  return (
    <AccountLayout
      variant='account.layout.pages.reset'
      loggedIn={false}
      {...props}
    >
      <Flex.Col
        data-comp={ResetPassword.displayName}
        center
        variant='account.pages.reset'
      >
        <Box variant='account.pages.reset.header'>
          <Heading variant='account.text.reset.heading'>
            Reset Password
          </Heading>
        </Box>

        <Box variant='account.pages.reset.content'>
          <ResetPasswordForm
            customerId={customerId}
            resetToken={resetToken}
          />
        </Box>
      </Flex.Col>
    </AccountLayout>
  );
};

ResetPassword.displayName = 'ResetPassword';

ResetPassword.propTypes = {
  customerId: PropTypes.string,
  resetToken: PropTypes.string,
};
