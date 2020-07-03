import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from './Loader';


export const LoaderHoc = ({ loading, children, ...props }) => {
  LoaderHoc.propTypes = {
    ...Loader.propTypes,
    loading: PropTypes.bool,
    children: PropTypes.any
  };

  if (loading) {
    return (
      <Loader
        m='auto'
        {...props}
      />
    );
  };

  return children;
};
