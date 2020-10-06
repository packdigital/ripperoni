/**
 * @jsx jsx
 * @prettier
 */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Label, Radio as RadioUI, jsx } from 'theme-ui';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { useSxProps } from '../../hooks/useSxProps';

export const Radio = forwardRef(
  ({ label, variant, defaultChecked, ...incomingProps }, ref) => {
    const { sxObject, props, propTypes } = useSxProps(incomingProps);

    Radio.propTypes = {
      ...propTypes,
      label: PropTypes.string,
      variant: PropTypes.string,
      defaultChecked: PropTypes.bool,
    };

    return (
      <Flex
        data-comp={Radio.displayName}
        as={Label}
        sx={{
          alignItems: 'center',
          ...sxObject,
        }}
        variant={variant}
        className='radio'
      >
        <RadioUI ref={ref} defaultChecked={defaultChecked} {...props} />
        <Box>{label}</Box>
      </Flex>
    );
  }
);

Radio.displayName = 'Radio';
