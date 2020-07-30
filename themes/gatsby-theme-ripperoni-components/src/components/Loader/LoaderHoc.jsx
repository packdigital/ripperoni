import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Loader } from './Loader';


export const LoaderHoc = forwardRef(({ loading, children, ...props }, ref) => {
  LoaderHoc.propTypes = {
    ...Loader.propTypes,
    loading: PropTypes.any,
    children: PropTypes.any
  };

  if (loading) {
    return (
      <Loader
        data-comp={LoaderHoc.displayName}
        ref={ref}
        m='auto'
        {...props}
      />
    );
  };

  return children;
});

LoaderHoc.displayName = 'Loader.Hoc';
