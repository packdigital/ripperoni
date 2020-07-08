/* eslint-disable import/namespace */
/* eslint-disable import/no-default-export */
import React from 'react';
import { Router } from '@reach/router';

import { Flex, Loader } from '@ripperoni/components';
import { isBrowser } from '@ripperoni/utilities';

import { PrivateRoute } from '../components/PrivateRoute';
import { useCustomerContext } from '../context/CustomerContext';
import * as Views from '../views';


export const AccountPage = React.memo(props => {
  const context = useCustomerContext();

  if (!isBrowser) {
    return null;
  }

  if (context.state.loggedIn === null || context.state.loading?.customerGet) {
    return (
      // make sure this flex takes up as much height as possible
      <Flex>
        <Loader m='auto' />
      </Flex>
    );
  }

  return (
    <Router basepath='/account'>
      <PrivateRoute
        {...props}
        path='/'
        condition={context.state.loggedIn}
        private={Views.Orders}
        public={Views.LoginSignUp}
      />

      <PrivateRoute
        {...props}
        path='/orders/:id'
        condition={context.state.loggedIn}
        private={Views.Order}
      />

      <PrivateRoute
        {...props}
        path='/addresses'
        condition={context.state.loggedIn}
        private={Views.AddressBook}
      />

      <Views.Login
        {...props}
        path='/login'
      />

      <Views.SignUp
        {...props}
        path='/signup'
      />

      <Views.PasswordReset
        {...props}
        path='/reset/:customerId/:resetToken'
      />

      <Views.AccountActivation
        {...props}
        path='/activate/:customerId/:activateToken'
      />
    </Router>
  );
});

AccountPage.displayName = 'Account Router';

export default AccountPage;
