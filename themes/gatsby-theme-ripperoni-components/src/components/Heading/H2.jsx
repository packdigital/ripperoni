/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const H2 = forwardRef((props, ref) => {
  H2.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={H2.displayName}
      ref={ref}
      variant='h2'
      {...props}
    />
  );
});

H2.displayName = 'Heading.H2';
