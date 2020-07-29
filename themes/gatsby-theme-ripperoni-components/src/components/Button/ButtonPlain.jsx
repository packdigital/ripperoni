/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Button } from './Button';


export const ButtonPlain = forwardRef((props, ref) => {
  ButtonPlain.propTypes = Button.propTypes;

  return (
    <Button
      data-comp={ButtonPlain.displayName}
      ref={ref}
      variant='plain'
      {...props}
    />
  );
});

ButtonPlain.displayName = 'Button.Link';
