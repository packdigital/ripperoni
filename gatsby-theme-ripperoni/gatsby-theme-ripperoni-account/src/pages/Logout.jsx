import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import { CustomerContext } from '../context/CustomerContext';


const LogoutPrivate = props => {
  console.log('ding');
  const { state, logout } = useContext(CustomerContext);
  console.log('state', state);
  // navigate('/account');

  useEffect(() => {
    console.log('logging out!');
    logout();
  }, []);

  return null;
};

const LogoutPublic = props => {
  console.log('dong');
  const { state, logout } = useContext(CustomerContext);
  console.log('state', state);
  // navigate('/account');

  useEffect(() => {
    // logout();
  }, []);

  return null;
};


export const Logout = {
  Private: LogoutPrivate,
  Public: LogoutPublic,
};
