/** @jsx jsx */
import { forwardRef } from 'react';
import { Button as ButtonUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as typographyProps from '../../props/typography';
import * as buttonProps from '../../props/button';

import { ButtonLink } from './ButtonLink';


export const Button = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [buttonProps, typographyProps]);

  return (
    <ButtonUI
      ref={ref}
      data-comp={Button.displayName}
      sx={sxObject}
      {...props}
    >
      {children || text}
    </ButtonUI>
  );
});

Button.displayName = 'Button';

Button.Link = ButtonLink;

Button.propTypes = {
  ...defaultProps.propTypes,
  ...buttonProps.propTypes,
  ...typographyProps.propTypes,
};
