import React, { forwardRef } from 'react';
import { Flex as FlexUI } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as flexProps from '../../props/flex';

import * as flexColProps from './FlexCol.sx';


export const FlexCol = forwardRef((props, ref) => {
  const { sxObject, props } = useSxProps(otherProps, [flexProps, flexColProps]);

  return (
    <FlexUI
      ref={ref}
      sx={sxObject}
      {...props}
    />
  );
});

FlexCol.displayName = 'FlexCol';

FlexCol.propTypes = {
  ...defaultProps.propTypes,
  ...flexProps.propTypes,
  ...flexColProps.propTypes,
};
