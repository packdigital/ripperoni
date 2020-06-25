/* eslint-disable import/namespace */
/* eslint-disable import/no-default-export */
import React, { useContext } from 'react';
import { Router } from '@reach/router';

import { Flex, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import * as Pages from '../pages';
import { PrivateRoute } from '../components/PrivateRoute';
import { CustomerContext, CustomerContextProvider } from '../context/CustomerContext';


const AccountPage = props => {
  return (
    <CustomerContextProvider>
      <AccountRouter {...props} />
    </CustomerContextProvider>
  );
};

const AccountRouter = props => {
  const { state } = useContext(CustomerContext);

  if (state.customer === null || state.loading?.['customer-get']) {
    return (
      // make sure this flex takes up as much height as possible
      <Flex
        position='absolute'
        height='100vh'
        width='100vw'
      >
        <Loader m='auto' />
      </Flex>
    );
  }

  const hasCustomer = state.customer !== null;

  return (
    <Router basepath='/account'>
      <PrivateRoute
        {...props}
        path='/'
        condition={hasCustomer}
        private={Pages.Orders}
        public={Pages.LoginSignUp}
      />

      <PrivateRoute
        {...props}
        path='/orders/:id'
        condition={hasCustomer}
        private={Pages.Order}
      />

      <PrivateRoute
        {...props}
        path='/addresses'
        condition={hasCustomer}
        private={Pages.AddressBook}
      />

      <Pages.Login
        {...props}
        path='/login'
      />

      <Pages.SignUp
        {...props}
        path='/signup'
      />

      <Pages.PasswordReset
        {...props}
        path='/reset/:customerId/:resetToken'
      />

      <Pages.AccountActivation
        {...props}
        path='/activate/:customerId/:activateToken'
      />
{console.log('sup')}
      <PrivateRoute
        {...props}
        path='/logout'
        condition={hasCustomer}
        public={Pages.Logout.Public}
        private={Pages.Logout.Private}
      />
    </Router>
  );
};

export default AccountPage;
