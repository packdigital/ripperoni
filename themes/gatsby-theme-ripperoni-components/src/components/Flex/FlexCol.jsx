/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Flex } from './Flex';


export const FlexCol = forwardRef((props, ref) => {
  FlexCol.propTypes = Flex.propTypes;

  return (
    <Flex
      data-comp={FlexCol.displayName}
      ref={ref}
      direction='column'
      {...props}
    />
  );
});

FlexCol.displayName = 'Flex.Col';
