/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Spinner, jsx } from 'theme-ui';

import { LoaderHoc } from './LoaderHoc';


export const Loader = forwardRef(({
  title,
  size,
  width,
  color = 'primary',
  ...props
}, ref) => {
  return (
    <Spinner
      data-comp={Loader.displayName}
      ref={ref}
      variant='loader'
      title={title}
      size={size}
      strokeWidth={width}
      color={color}
      {...props}
    />
  );
});

Loader.displayName = 'Loader';

Loader.Hoc = LoaderHoc;

Loader.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};
