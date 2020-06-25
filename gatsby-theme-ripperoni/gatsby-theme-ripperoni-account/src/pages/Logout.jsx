import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import { CustomerContext } from '../context/CustomerContext';


export const Logout = props => {
  const { logout } = useContext(CustomerContext);

  useEffect(() => {
    logout();
    navigate('/account');
  }, []);

  return null;
};
