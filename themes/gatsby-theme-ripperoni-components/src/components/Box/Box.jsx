/** @jsx jsx */
import { forwardRef } from 'react';
import { Box as BoxUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const Box = forwardRef(({
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Box.propTypes = propTypes;

  return (
    <BoxUI
      data-comp={Box.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {children}
    </BoxUI>
  );
});

Box.displayName = 'Box';
