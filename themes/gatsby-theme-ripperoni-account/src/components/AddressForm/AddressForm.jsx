/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Input } from 'theme-ui';

import { Box, Button, Checkbox, FieldGroup, Flex, Heading, Loader } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';
import { CountrySelect } from './AddressFormCountrySelect';
import { ProvinceSelect } from './AddressFormProvinceSelect';
import { ZipInput } from './AddressFormZipInput';
import { PhoneInput } from './AddressFormPhoneInput';


export const AddressForm = ({
  title,
  address = {},
  isDefault,
  cancelToggle,
  action,
  ...props
}) => {
  const { state } = useCustomerContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!state.loading) {
      setIsLoading(false);
    }
  }, [state.loading]);

  return (
    <Box {...props}>
      <Flex
        as='form'
        variant='account.forms.address'
        direction={['column', 'row']}
        wrap={['nowrap', 'wrap']}
        onSubmit={event => {
          event.preventDefault();
          setIsLoading(true);

          const data = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            address1: event.target.address1.value,
            address2: event.target.address2.value,
            city: event.target.city.value,
            province: event.target.province.value,
            country: event.target.country.value,
            zip: event.target.zip.value,
            phone: event.target.phone.value,
          };

          action({ address: data, id: address.id, isDefault: event.target.default.checked });
        }}
      >
        <Flex
          variant='account.forms.address.header'
          between
        >
          <Heading variant='account.text.addressBook.form.heading'>
            {title}
          </Heading>

          <Checkbox
            variant='account.forms.address.default'
            label='Make Default'
            name='default'
            defaultChecked={isDefault}
          />
        </Flex>

        <FieldGroup
          variant='account.forms.address.firstName'
          defaultValue={address.firstName}
          label='First Name'
          name='firstName'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.lastName'
          defaultValue={address.lastName}
          label='Last Name'
          name='lastName'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.address1'
          defaultValue={address.address1}
          label='Address Line 1'
          name='address1'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.address2'
          defaultValue={address.address2}
          label='Address Line 2'
          name='address2'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.city'
          defaultValue={address.city}
          label='City'
          name='city'
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.province'
          defaultValue={address.province}
          label='State'
          name='province'
          country={address.country || 'united states'}
          as={ProvinceSelect}
        />

        <FieldGroup
          variant='account.forms.address.zip'
          defaultValue={address.zip}
          label='Zip Code'
          name='zip'
          as={ZipInput}
        />

        <FieldGroup
          variant='account.forms.address.country'
          defaultValue={address.country}
          label='Country'
          name='country'
          as={CountrySelect}
        />

        <FieldGroup
          variant='account.forms.address.phone'
          defaultValue={address.phone}
          label='Phone Number'
          name='phone'
          as={PhoneInput}
        />

        <Flex
          center
          variant='account.forms.address.ctas'
        >
          <Loader.Hoc loading={isLoading}>
            <Button variant='account.forms.address.saveAddress'>
              Save
            </Button>

            {cancelToggle && (
              <Button
                variant='account.forms.address.cancelAddress'
                onClick={cancelToggle}
              >
                Cancel
              </Button>
            )}
          </Loader.Hoc>
        </Flex>
      </Flex>
    </Box>
  );
};
