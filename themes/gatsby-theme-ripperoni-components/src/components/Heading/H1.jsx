/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const H1 = forwardRef((props, ref) => {
  H1.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={H1.displayName}
      ref={ref}
      variant='h1'
      {...props}
    />
  );
});

H1.displayName = 'Heading.H1';
