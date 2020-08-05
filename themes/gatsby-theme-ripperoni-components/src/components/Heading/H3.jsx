/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const H3 = forwardRef((props, ref) => {
  H3.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={H3.displayName}
      ref={ref}
      variant='h3'
      {...props}
    />
  );
});

H3.displayName = 'Heading.H3';
