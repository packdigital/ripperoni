/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import { ButtonLink } from './ButtonLink';
import { ButtonPlain } from './ButtonPlain';


export const Button = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Button.propTypes = {
    ...propTypes,
    text: PropTypes.any,
    children: PropTypes.any,
  };

  return (
    <ButtonUI
      data-comp={Button.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {children || text}
    </ButtonUI>
  );
});

Button.Link = ButtonLink;
Button.Plain = ButtonPlain;
Button.displayName = 'Button';
