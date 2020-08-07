/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const h5 = forwardRef((props, ref) => {
  h5.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={h5.displayName}
      ref={ref}
      variant='h5'
      {...props}
    />
  );
});

h5.displayName = 'Heading.h5';
