/** @jsx jsx */
import { Box as BoxUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';


export const Box = incomingProps => {
  const { sxObject, props } = useSxProps(incomingProps);

  return (
    <BoxUI
      sx={sxObject}
      {...props}
    />
  );
};

Box.displayName = 'Box';

Box.propTypes = defaultProps.propTypes;
