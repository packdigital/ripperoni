/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Flex } from './Flex';


export const FlexCol = props => {
  FlexCol.propTypes = Flex.propTypes;

  return (
    <Flex
      direction='column'
      {...props}
    />
  );
};
