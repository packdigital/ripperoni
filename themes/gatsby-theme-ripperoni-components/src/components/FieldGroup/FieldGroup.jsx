/** @jsx jsx */
import { forwardRef } from 'react';
import { Field as FieldUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { useSxProps } from '../../hooks/useSxProps';
import { Box } from '../Box';


export const FieldGroup = forwardRef(({
  as,
  label,
  name,
  defaultValue,
  variant = 'forms.fieldGroup',
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  FieldGroup.propTypes = {
    ...propTypes,
    children: PropTypes.any,
  };

  return (
    <Box
      data-comp={FieldGroup.displayName}
      sx={sxObject}
      variant={variant}
    >
      <FieldUI
        ref={ref}
        as={as}
        label={label}
        name={name}
        defaultValue={defaultValue}
        {...props}
      />
    </Box>
  );
});

FieldGroup.displayName = 'Field Group';
