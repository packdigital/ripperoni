/** @jsx jsx */
import { forwardRef } from 'react';
import { Flex as FlexUI, jsx } from 'theme-ui';

import FlexSx from './Flex.sx';
import { FlexCol } from './FlexCol';
import { useSxProps } from '../../hooks/useSxProps';


export const Flex = forwardRef((incomingProps, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps, FlexSx);

  Flex.propTypes = propTypes;

  return (
    <FlexUI
      data-comp={Flex.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    />
  );
});

Flex.Col = FlexCol;
Flex.displayName = 'Flex';
