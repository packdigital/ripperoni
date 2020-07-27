/* eslint-disable import/namespace */
/* eslint-disable import/no-default-export */
import React from 'react';
import { Router } from '@reach/router';

import { Flex, Loader } from '@ripperoni/components';
import { isBrowser } from '@ripperoni/utilities';
import { PrivateRoute } from '@ripperoni/account/components/PrivateRoute';
import * as Views from '@ripperoni/account/views';
import { useCustomerContext } from '@ripperoni/account/context/CustomerContext';


export const AccountPage = React.memo(props => {
  if (!isBrowser) {
    return null;
  }

  const context = useCustomerContext();

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
        public={Views.LoginSignup}
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

      <Views.Signup
        {...props}
        path='/signup'
      />

      <Views.RecoverPassword
        {...props}
        path='/recover'
      />

      <Views.ResetPassword
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
