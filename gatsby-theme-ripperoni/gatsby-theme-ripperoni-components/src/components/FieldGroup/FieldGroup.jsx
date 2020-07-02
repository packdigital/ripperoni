/** @jsx jsx */
import { forwardRef } from 'react';
import { Field as FieldUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import { Box } from '../Box';


export const FieldGroup = forwardRef(({
  as,
  label,
  name,
  defaultValue,
  ...incomingProps
}, ref) => {
  const { sxObject, props } = useSxProps(incomingProps);

  return (
    <Box
      ref={ref}
      sx={sxObject}
      {...props}
    >
      <FieldUI
        as={as}
        label={label}
        name={name}
        defaultValue={defaultValue}
      />
    </Box>
  );
});

FieldGroup.displayName = 'Field Group';

FieldGroup.propTypes = {
  ...defaultProps.propTypes,
  children: PropTypes.any,
};


// <FieldGroup
//   width={['100%', null, null, '50%']}
//   defaultValue={firstName}
//   label='First Name'
//   name='firstName'
//   as={Input}
// />

// const CountrySelect = props => (
//   <Select {...props}>
//     <option value='US'>United States</option>
//   </Select>
// );

// const ZipInput = props => (
//   <Input
//     pattern='\d{5}'
//     maxlength='5'
//     size='5'
//     {...props}
//   />
// );

// <FieldGroup
//   width={['100%', null, null, '50%']}
//   defaultValue={country}
//   label='Country'
//   name='country'
//   as={CountrySelect}
// />

// <FieldGroup
//   width={['100%', null, null, '50%']}
//   defaultValue={zip}
//   label='Zip'
//   name='zip'
//   as={ZipInput}
// />
