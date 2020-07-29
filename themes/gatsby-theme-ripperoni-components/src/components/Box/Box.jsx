/** @jsx jsx */
import { forwardRef } from 'react';
import { Box as BoxUI, jsx } from 'theme-ui';

import { useSxProps } from '@ripperoni/components/hooks/useSxProps';


export const Box = forwardRef((incomingProps, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Box.propTypes = propTypes;

  return (
    <BoxUI
      data-comp={Box.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    />
  );
});

Box.displayName = 'Box';
