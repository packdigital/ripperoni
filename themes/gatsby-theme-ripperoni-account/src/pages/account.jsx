/**
 * @jsx jsx
 * @prettier
 */

/* eslint-disable import/namespace */
/* eslint-disable import/no-default-export */
import React from 'react';
import { Router } from '@reach/router';
import { jsx } from 'theme-ui';

import { Flex, Loader } from '@ripperoni/components';
import { isBrowser } from '@ripperoni/utilities';
import { PrivateRoute } from '@ripperoni/account/components/PrivateRoute';
import * as Views from '@ripperoni/account/views';
import { useCustomerContext } from '@ripperoni/account/context/CustomerContext';

export const AccountPage = React.memo((props) => {
  if (!isBrowser) {
    return null;
  }

  const {
    state: { loggedIn },
  } = useCustomerContext();

  if (loggedIn === null) {
    return (
      <Flex
        sx={{
          minHeight: [
            'calc(100vh - 73px - 658.8px)',
            null,
            null,
            'calc(100vh - 89px - 335px)',
            'calc(100vh - 89px - 383px)',
          ],
        }}
      >
        <Loader m='auto' />
      </Flex>
    );
  }

  return (
    <Router basepath='/account'>
      <PrivateRoute
        {...props}
        path='/'
        condition={loggedIn}
        private={Views.Orders}
        public={Views.LoginSignup}
      />

      <PrivateRoute
        {...props}
        path='/orders/:id'
        condition={loggedIn}
        private={Views.Order}
      />

      <PrivateRoute
        {...props}
        path='/addresses'
        condition={loggedIn}
        private={Views.AddressBook}
      />

      <Views.Login {...props} path='/login' />

      <Views.Signup {...props} path='/signup' />

      <Views.RecoverPassword {...props} path='/recover' />

      <Views.ResetPassword {...props} path='/reset/:customerId/:resetToken' />

      <Views.AccountActivation
        {...props}
        path='/activate/:customerId/:activateToken'
      />
    </Router>
  );
});

AccountPage.displayName = 'Account Router';

export default AccountPage;
