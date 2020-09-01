/** @jsx jsx */
import { forwardRef } from 'react';
import { Box as BoxUI, jsx } from 'theme-ui';

import { useSxProps } from '@ripperoni/components/hooks/useSxProps';


export const Box = forwardRef(({
  children,
  _content,
  ...incomingProps
}, ref) => {
  // console.log('incomingProps', incomingProps);
  const { sxObject, props, propTypes } = useSxProps(incomingProps);
  // console.log('props', props);

  Box.propTypes = propTypes;

  return (
    <BoxUI
      data-comp={Box.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {_content || children}
    </BoxUI>
  );
});

Box.displayName = 'Box';
