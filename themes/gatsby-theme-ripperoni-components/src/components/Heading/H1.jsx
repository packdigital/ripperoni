/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const h1 = forwardRef((props, ref) => {
  h1.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={h1.displayName}
      ref={ref}
      variant='h1'
      {...props}
    />
  );
});

h1.displayName = 'Heading.h1';
