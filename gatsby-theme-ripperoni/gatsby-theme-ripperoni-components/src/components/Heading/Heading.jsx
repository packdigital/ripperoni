/** @jsx jsx */
import { forwardRef } from 'react';
import { Heading as HeadingUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as textProps from '../../props/typography';


export const Heading = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [textProps]);

  return (
    <HeadingUI
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {children || text}
    </HeadingUI>
  );
});

Heading.displayName = 'Heading';

Heading.propTypes = {
  ...defaultProps.propTypes,
  ...textProps.propTypes,
};
