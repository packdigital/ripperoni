/* eslint-disable import/no-default-export */
import React from 'react';

import { isBrowser } from '@ripperoni/utilities';

import { Login as LoginView } from '../views/Login';

export const Login = (props) => {
  if (!isBrowser) {
    return null;
  }

  return <LoginView {...props} />;
};

export default Login;
