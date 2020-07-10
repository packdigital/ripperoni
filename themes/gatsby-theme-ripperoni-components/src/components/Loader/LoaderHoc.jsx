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
        data-comp={LoaderHoc.displayName}
        m='auto'
        {...props}
      />
    );
  };

  return children;
};

LoaderHoc.displayName = 'Loader.Hoc';
