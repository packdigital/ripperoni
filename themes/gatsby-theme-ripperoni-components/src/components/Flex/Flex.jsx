/** @jsx jsx */
import { forwardRef } from 'react';
import { Flex as FlexUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import { FlexCol } from './FlexCol';
import { FlexRow } from './FlexRow';
import FlexSx from './Flex.sx';


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
Flex.Row = FlexRow;
Flex.displayName = 'Flex';
