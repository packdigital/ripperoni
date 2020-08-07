/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const h3 = forwardRef((props, ref) => {
  h3.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={h3.displayName}
      ref={ref}
      variant='h3'
      {...props}
    />
  );
});

h3.displayName = 'Heading.h3';
