/** @jsx jsx */
import { forwardRef } from 'react';
import { Field as FieldUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { useSxProps } from '@ripperoni/components/hooks/useSxProps';

import { Box } from '../Box';


export const FieldGroup = forwardRef(({
  as,
  label,
  name,
  defaultValue,
  variant,
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
