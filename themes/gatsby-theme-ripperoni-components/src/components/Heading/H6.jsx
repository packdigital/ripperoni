/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const h6 = forwardRef((props, ref) => {
  h6.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={h6.displayName}
      ref={ref}
      variant='h6'
      {...props}
    />
  );
});

h6.displayName = 'Heading.h6';
