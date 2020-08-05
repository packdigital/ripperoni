/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const H4 = forwardRef((props, ref) => {
  H4.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={H4.displayName}
      ref={ref}
      variant='h4'
      {...props}
    />
  );
});

H4.displayName = 'Heading.H4';
