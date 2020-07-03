/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Button } from './Button';


export const ButtonLink = props => {
  ButtonLink.propTypes = Button.propTypes;

  return (
    <Button
      variant='styles.a'
      {...props}
    />
  );
};

ButtonLink.displayName = 'Button Link';
