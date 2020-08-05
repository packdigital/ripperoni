/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const H6 = forwardRef((props, ref) => {
  H6.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={H6.displayName}
      ref={ref}
      variant='h6'
      {...props}
    />
  );
});

H6.displayName = 'Heading.H6';
