/* eslint-disable import/no-default-export */
import React from 'react';

import { isBrowser } from '@ripperoni/utilities';

import { RecoverPassword as RecoverPasswordView } from '../views/RecoverPassword';

export const Recover = (props) => {
  if (!isBrowser) {
    return null;
  }

  return <RecoverPasswordView {...props} />;
};

export default Recover;
