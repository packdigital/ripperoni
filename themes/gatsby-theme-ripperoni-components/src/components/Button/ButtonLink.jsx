/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Button } from './Button';


export const ButtonLink = props => {
  ButtonLink.propTypes = Button.propTypes;

  return (
    <Button
      data-comp={ButtonLink.displayName}
      variant='styles.a'
      {...props}
    />
  );
};

ButtonLink.displayName = 'Button.Link';
