import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from '@reach/router';

import { Box, Flex, Heading } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const ResetPassword = (props) => {
  const { pathname } = useLocation();
  const { customerId, resetToken } = useParams();

  return (
    <AccountLayout variant='account.layout.reset' loggedIn={false} {...props}>
      <Flex.Col
        data-comp={ResetPassword.displayName}
        center
        variant='account.reset'
      >
        <Box variant='account.reset.header'>
          <Heading variant='account.text.reset.heading'>Reset Password</Heading>
        </Box>

        <Box variant='account.reset.content'>
          <ResetPasswordForm
            customerId={customerId}
            resetToken={resetToken}
            pathname={pathname}
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
