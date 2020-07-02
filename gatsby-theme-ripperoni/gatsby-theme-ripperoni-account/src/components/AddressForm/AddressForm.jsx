/* eslint-disable max-lines */
import React from 'react';
import { Checkbox, Input, Label, Select } from 'theme-ui';
import { Countries } from 'country-and-province';

import { Box, Button, FieldGroup, Flex, Heading, Loader } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


export const AddressForm = ({
  title,
  isDefault,
  address: {
    firstName,
    lastName,
    address1,
    address2,
    city,
    province,
    country = 'united states',
    zip,
  } = {},
  cancelToggle,
  ...props
}) => {
  const provinceValues = Countries.byName(country)?.provinces?.data
    .map(({ name, code }) => [name, code]);

  const DefaultAddressCheckbox = ({
    defaultValue,
    ...props
  }) => (
    <Box {...props}>
      <Label>
        <Checkbox
          name='default'
          defaultValue={defaultValue}
          {...props}
        />
        Make Default
      </Label>
    </Box>
  );

  const ProvinceSelect = props => (
    <Select {...props}>
      {provinceValues.map(([label, value]) => (
        <option
          key={value}
          value={value}
        >
          {label}
        </option>
      ))}
    </Select>
  );

  const CountrySelect = props => (
    <Select {...props}>
      <option value='US'>United States</option>
    </Select>
  );

  const ZipInput = props => (
    <Input
      pattern='\d{5}'
      maxlength='5'
      size='5'
      {...props}
    />
  );

  return (
    <Box variant='pages.account.addressBook.form'>
      <Flex
        as='form'
        variant='forms.account.address'
        direction={['column', 'row']}
        wrap={['nowrap', 'wrap']}
        onSubmit={event => {
          event.preventDefault();
        }}
        {...props}
      >
        <Flex
          variant='pages.account.addressBook.form.header'
          width='100%'
          between
        >
          <Heading variant='text.account.addressBook.formHeading'>
            {title}
          </Heading>

          <DefaultAddressCheckbox defaultValue={isDefault} />
        </Flex>

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={firstName}
          label='First Name'
          name='firstName'
          as={Input}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={lastName}
          label='Last Name'
          name='lastName'
          as={Input}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={address1}
          label='Address'
          name='address1'
          as={Input}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={address2}
          label='Apartment, Suite, etc.'
          name='address2'
          as={Input}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={city}
          label='City'
          name='city'
          as={Input}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={province}
          label='State'
          name='province'
          as={ProvinceSelect}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={country}
          label='Country'
          name='country'
          as={CountrySelect}
        />

        <FieldGroup
          variant='forms.account.address.fieldGroup'
          width={['100%', null, null, '50%']}
          defaultValue={zip}
          label='Zip'
          name='zip'
          as={ZipInput}
        />

        <Flex
          middle
          center
          width='100%'
          variant='pages.account.addressBook.formControls'
        >
          <Loader.Hoc>
            <Button>
              Save
            </Button>

            {cancelToggle && (
              <Button.Link onClick={cancelToggle}>
                Cancel
              </Button.Link>
            )}
          </Loader.Hoc>
        </Flex>
      </Flex>
    </Box>
  );
};
