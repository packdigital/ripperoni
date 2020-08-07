/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const h4 = forwardRef((props, ref) => {
  h4.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={h4.displayName}
      ref={ref}
      variant='h4'
      {...props}
    />
  );
});

h4.displayName = 'Heading.h4';
