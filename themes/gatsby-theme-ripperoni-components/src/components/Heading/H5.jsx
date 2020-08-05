/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const H5 = forwardRef((props, ref) => {
  H5.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={H5.displayName}
      ref={ref}
      variant='h5'
      {...props}
    />
  );
});

H5.displayName = 'Heading.H5';
