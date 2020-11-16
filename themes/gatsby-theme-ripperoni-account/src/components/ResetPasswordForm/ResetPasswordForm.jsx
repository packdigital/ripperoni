import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, useStaticQuery } from 'gatsby';

import { Button, FieldGroup, Flex, Loader } from '@ripperoni/components';

import { Password } from './Password';
import { AccountFormMessage } from '../AccountFormMessage';
import { useCustomerContext } from '../../context/CustomerContext';

export const ResetPasswordForm = ({
  customerId,
  resetToken,
  pathname = `/account/reset/${customerId}/${resetToken}`,
  ...props
}) => {
  const { site } = useStaticQuery(staticQuery);
  const { shopifyUrl: origin } = site.siteMetadata.site;
  const { state, resetPassword } = useCustomerContext();

  if (state.customer) {
    navigate('/account');
  }

  return (
    <Flex.Col
      data-comp={ResetPasswordForm.displayName}
      variant='account.forms.reset'
      as='form'
      onSubmit={(event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const url = origin + pathname;

        resetPassword({ password, url });
      }}
      {...props}
    >
      <Flex variant='account.forms.reset.inputs'>
        <FieldGroup
          variant='account.forms.reset.password'
          label='Password'
          name='password'
          as={Password}
        />
      </Flex>

      <Flex variant='account.forms.reset.ctas'>
        <Loader.Hoc
          variant='account.forms.reset.loader'
          loading={state.loading?.passwordReset}
        >
          <Button variant='account.forms.reset.submit'>Submit</Button>

          <AccountFormMessage messages={state.errors?.passwordReset} />
        </Loader.Hoc>
      </Flex>
    </Flex.Col>
  );
};

ResetPasswordForm.displayName = 'Reset Password Form';

ResetPasswordForm.propTypes = {
  customerId: PropTypes.string,
  resetToken: PropTypes.string,
  pathname: PropTypes.string,
};

const staticQuery = graphql`
  query {
    site {
      siteMetadata {
        site {
          shopifyUrl
        }
      }
    }
  }
`;
