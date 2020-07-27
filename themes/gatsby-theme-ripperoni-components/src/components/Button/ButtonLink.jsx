/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Button } from './Button';


export const ButtonLink = forwardRef((props, ref) => {
  ButtonLink.propTypes = Button.propTypes;

  return (
    <Button
      data-comp={ButtonLink.displayName}
      ref={ref}
      variant='styles.a'
      {...props}
    />
  );
});

ButtonLink.displayName = 'Button.Link';
