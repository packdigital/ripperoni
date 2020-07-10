/** @jsx jsx */
import { Box as BoxUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const Box = incomingProps => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Box.propTypes = propTypes;

  return (
    <BoxUI
      data-comp={Box.displayName}
      sx={sxObject}
      {...props}
    />
  );
};

Box.displayName = 'Box';
