/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Flex } from './Flex';


export const FlexRow = props => {
  FlexRow.propTypes = Flex.propTypes;

  return (
    <Flex
      direction='row'
      {...props}
    />
  );
};
