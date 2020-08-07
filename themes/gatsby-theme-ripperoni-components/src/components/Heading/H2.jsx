/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const h2 = forwardRef((props, ref) => {
  h2.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={h2.displayName}
      ref={ref}
      variant='h2'
      {...props}
    />
  );
});

h2.displayName = 'Heading.h2';
