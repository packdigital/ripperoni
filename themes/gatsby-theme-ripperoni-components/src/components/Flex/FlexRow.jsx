/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Flex } from './Flex';


export const FlexRow = forwardRef((props, ref) => {
  FlexRow.propTypes = Flex.propTypes;

  return (
    <Flex
      data-comp={FlexRow.displayName}
      ref={ref}
      direction='row'
      {...props}
    />
  );
});

FlexRow.displayName = 'Flex.Row';
