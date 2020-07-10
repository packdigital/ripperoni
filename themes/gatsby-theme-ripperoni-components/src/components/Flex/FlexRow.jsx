/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Flex } from './Flex';


export const FlexRow = props => {
  FlexRow.propTypes = Flex.propTypes;

  return (
    <Flex
      data-comp={FlexRow.displayName}
      direction='row'
      {...props}
    />
  );
};

FlexRow.displayName = 'Flex.Row';
