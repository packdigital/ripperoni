/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Input } from 'theme-ui';

import { Box, Button, Checkbox, FieldGroup, Flex, Heading, Loader } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';
import { CountrySelect } from './AddressFormCountrySelect';
import { ProvinceSelect } from './AddressFormProvinceSelect';
import { ZipInput } from './AddressFormZipInput';


export const AddressForm = ({
  title,
  address = {},
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

  const { id, firstName, lastName, address1, address2, city, province, zip, country = 'united states' } = address;
  const isDefault = state.customer.defaultAddress?.id === id;

  return (
    <Box variant='pages.account.addressBook.form'>
      <Flex
        as='form'
        variant='forms.account.address'
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
          };

          action({ address: data, id: address.id, isDefault: event.target.default.checked });
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

          <Checkbox
            label='Make Default'
            name='default'
            defaultChecked={isDefault}
          />
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
          country={country}
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
          <Loader.Hoc loading={isLoading}>
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
