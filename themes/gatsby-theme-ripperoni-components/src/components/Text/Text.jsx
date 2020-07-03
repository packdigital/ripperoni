/** @jsx jsx */
import { forwardRef } from 'react';
import { Text as TextUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as typographyProps from '../../props/typography';


export const Text = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [typographyProps]);

  return (
    <TextUI
      ref={ref}
      data-comp={Text.displayName}
      sx={sxObject}
      {...props}
    >
      {children || text}
    </TextUI>
  );
});

Text.displayName = 'Text';

Text.propTypes = {
  ...defaultProps.propTypes,
  ...typographyProps.propTypes,
};
