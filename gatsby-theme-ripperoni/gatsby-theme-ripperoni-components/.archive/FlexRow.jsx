import React, { forwardRef } from 'react';
import { Flex as FlexUI } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as flexProps from '../../props/flex';

import * as flexRowProps from './FlexRow.sx';


export const FlexRow = forwardRef((incomingProps, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [flexProps, flexRowProps]);

  return (
    <FlexUI
      ref={ref}
      sx={sxObject}
      {...props}
    />
  );
});

FlexRow.displayName = 'FlexRow';

FlexRow.propTypes = {
  ...defaultProps.propTypes,
  ...flexProps.propTypes,
  ...flexRowProps.propTypes,
};
