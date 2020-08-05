/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Heading } from './Heading';


export const Display = forwardRef((props, ref) => {
  Display.propTypes = Heading.propTypes;

  return (
    <Heading
      data-comp={Display.displayName}
      ref={ref}
      variant='display'
      {...props}
    />
  );
});

Display.displayName = 'Heading.Display';
