/* eslint-disable import/no-default-export */
import React from 'react';

import { isBrowser } from '@ripperoni/utilities';

import { Signup as SignupView } from '../views/Signup';

export const Signup = (props) => {
  if (!isBrowser) {
    return null;
  }

  return <SignupView {...props} />;
};

export default Signup;
