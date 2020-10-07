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

import { Orders } from '../views/Orders';
import { LoginSignup } from '../views/LoginSignup';
import { Order } from '../views/Order';
import { AddressBook } from '../views/AddressBook';
import { Login } from '../views/Login';
import { Signup } from '../views/Signup';
import { RecoverPassword } from '../views/RecoverPassword';
import { ResetPassword } from '../views/ResetPassword';
import { AccountActivation } from '../views/AccountActivation';
import { PrivateRoute } from '../components/PrivateRoute';
import { useCustomerContext } from '../context/CustomerContext';

export const AccountPage = React.memo((props) => {
  if (!isBrowser) {
    return null;
  }

  const {
    state: { loggedIn, ready },
  } = useCustomerContext();

  if (!ready) {
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
        private={Orders}
        public={LoginSignup}
      />

      <PrivateRoute
        {...props}
        path='/orders/:id'
        condition={loggedIn}
        private={Order}
      />

      <PrivateRoute
        {...props}
        path='/addresses'
        condition={loggedIn}
        private={AddressBook}
      />

      <Login {...props} path='/login' />

      <Signup {...props} path='/signup' />

      <RecoverPassword {...props} path='/recover' />

      <ResetPassword {...props} path='/reset/:customerId/:resetToken' />

      <AccountActivation
        {...props}
        path='/activate/:customerId/:activateToken'
      />
    </Router>
  );
});

AccountPage.displayName = 'Account Router';

export default AccountPage;
