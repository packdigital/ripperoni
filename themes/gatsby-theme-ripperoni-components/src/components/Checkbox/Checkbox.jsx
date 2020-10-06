/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as CheckboxUI, Label, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import { Box } from '../Box';
import { Flex } from '../Flex';


export const Checkbox = forwardRef(({
  label,
  variant,
  defaultChecked,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Checkbox.propTypes = {
    ...propTypes,
    label: PropTypes.string,
    variant: PropTypes.string,
    defaultChecked: PropTypes.bool,
  };

  return (
    <Flex
      data-comp={Checkbox.displayName}
      as={Label}
      sx={{
        alignItems: 'center',
        ...sxObject,
      }}
      variant={variant}
      className='checkbox'
    >
      <CheckboxUI
        ref={ref}
        defaultChecked={defaultChecked}
        {...props}
      />
      <Box>{label}</Box>
    </Flex>
  );
});

Checkbox.displayName = 'Checkbox';
