/* eslint-disable react/prop-types */
import React from 'react';
import { navigate } from 'gatsby';

export const PrivateRoute = ({
  wait,
  condition,
  public: Public,
  private: Private,
  ...props
}) => {
  if (wait) {
    return null;
  }

  if (condition) {
    return <Private {...props} />;
  }

  if (!condition && Public) {
    return <Public {...props} />;
  }

  navigate('/account/');

  return null;
};

PrivateRoute.displayName = 'Private Route';
