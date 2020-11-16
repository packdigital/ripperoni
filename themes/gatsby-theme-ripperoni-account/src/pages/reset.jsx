/* eslint-disable import/no-default-export */
import React from 'react';

import { isBrowser } from '@ripperoni/utilities';

import { ResetPassword as ResetPasswordView } from '../views/ResetPassword';

export const Reset = (props) => {
  if (!isBrowser) {
    return null;
  }

  return <ResetPasswordView {...props} />;
};

export default Reset;
