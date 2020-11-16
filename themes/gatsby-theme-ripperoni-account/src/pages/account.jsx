/**
 * @jsx jsx
 */
import { Router } from '@reach/router';
import { jsx } from 'theme-ui';

import { Flex, Loader } from '@ripperoni/components';
import { isBrowser } from '@ripperoni/utilities';

import { Login } from '../views/Login';
import { Order } from '../views/Order';
import { Orders } from '../views/Orders';
import { Signup } from '../views/Signup';
import { AddressBook } from '../views/AddressBook';
import { LoginSignup } from '../views/LoginSignup';
import { ResetPassword } from '../views/ResetPassword';
import { RecoverPassword } from '../views/RecoverPassword';
import { AccountActivation } from '../views/AccountActivation';
import { useCustomer } from '../hooks/useCustomer';
import { useCustomerReady } from '../hooks/useCustomerReady';
import { PrivateRoute } from '../components/PrivateRoute';

export const AccountPage = (props) => {
  const customer = useCustomer();
  const customerReady = useCustomerReady();

  if (!isBrowser) {
    return null;
  }

  if (!customerReady) {
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
        condition={customer}
        private={Orders}
        public={LoginSignup}
      />

      <PrivateRoute
        {...props}
        path='/orders/:id'
        condition={customer}
        private={Order}
      />

      <PrivateRoute
        {...props}
        path='/addresses'
        condition={customer}
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
};

AccountPage.displayName = 'Account Router';

// eslint-disable-next-line
export default AccountPage;
