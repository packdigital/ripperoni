/**
 * @prettier
 */

/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Input } from 'theme-ui';

import {
  Box,
  Button,
  Checkbox,
  FieldGroup,
  Flex,
  Heading,
  Loader,
} from '@ripperoni/components';

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
  const {
    state: { loading, errors },
  } = useCustomerContext();
  const [isWaiting, setIsWaiting] = useState(false);
  const [firstName, setFirstName] = useState(address.firstName || '');
  const [lastName, setLastName] = useState(address.lastName || '');
  const [address1, setAddress1] = useState(address.address1 || '');
  const [address2, setAddress2] = useState(address.address2 || '');
  const [city, setCity] = useState(address.city || '');
  const [province, setProvince] = useState(address.province || 'AL');
  const [country, setCountry] = useState(address.country || 'united states');
  const [zip, setZip] = useState(address.zip || '');
  const [phone, setPhone] = useState(address.phone || '');
  const [defaultAddress, setDefaultAddress] = useState(isDefault || false);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setProvince('');
    setCountry('');
    setZip('');
    setPhone('');
    setDefaultAddress(false);
  };

  useEffect(() => {
    const hasErrors = errors?.addressCreate?.length;
    const hasFinished = !loading?.addressCreate;

    if (isWaiting && hasFinished) {
      setIsWaiting(false);

      if (!hasErrors) {
        clearForm();
      }
    }
  }, [loading, errors]);

  return (
    <Box {...props}>
      <Flex
        as='form'
        variant='account.forms.address'
        direction={['column', 'row']}
        wrap={['nowrap', 'wrap']}
        onSubmit={(event) => {
          event.preventDefault();

          setIsWaiting(true);

          action({
            id: address.id,
            isDefault: defaultAddress,
            address: {
              firstName,
              lastName,
              address1,
              address2,
              city,
              province,
              country,
              zip,
              phone,
            },
          });
        }}
      >
        <Flex variant='account.forms.address.header' between>
          <Heading variant='account.text.addressBook.form.heading'>
            {title}
          </Heading>

          <Checkbox
            variant='account.forms.address.default'
            name='default'
            label='Make Default'
            value={defaultAddress}
            onChange={() => setDefaultAddress(!defaultAddress)}
            // defaultChecked={isDefault}
          />
        </Flex>

        <FieldGroup
          variant='account.forms.address.firstName'
          name='firstName'
          label='First Name'
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.lastName'
          name='lastName'
          label='Last Name'
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.address1'
          name='address1'
          label='Address Line 1'
          value={address1}
          onChange={({ target: { value } }) => setAddress1(value)}
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.address2'
          name='address2'
          label='Address Line 2'
          value={address2}
          onChange={({ target: { value } }) => setAddress2(value)}
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.city'
          name='city'
          label='City'
          value={city}
          onChange={({ target: { value } }) => setCity(value)}
          as={Input}
        />

        <FieldGroup
          variant='account.forms.address.province'
          name='province'
          label='State'
          value={province}
          onChange={({ target: { value } }) => setProvince(value)}
          // country is required to know which provinces to get
          country={country || 'united states'}
          as={ProvinceSelect}
        />

        <FieldGroup
          variant='account.forms.address.zip'
          name='zip'
          label='Zip Code'
          value={zip}
          onChange={({ target: { value } }) => setZip(value)}
          as={ZipInput}
        />

        <FieldGroup
          variant='account.forms.address.country'
          name='country'
          label='Country'
          value={country}
          onChange={({ target: { value } }) => setCountry(value)}
          country={country}
          as={CountrySelect}
        />

        <FieldGroup
          variant='account.forms.address.phone'
          name='phone'
          label='Phone Number'
          value={phone}
          onChange={({ target: { value } }) => setPhone(value)}
          as={PhoneInput}
        />

        <Flex center variant='account.forms.address.ctas'>
          {/* need to be able to display error message */}

          <Loader.Hoc loading={isWaiting}>
            <Button variant='account.forms.address.saveAddress'>Save</Button>

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
