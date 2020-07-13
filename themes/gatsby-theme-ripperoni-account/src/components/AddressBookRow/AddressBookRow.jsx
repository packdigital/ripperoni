/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Box, Button, Flex } from '@ripperoni/components';
import { isBrowser } from '@ripperoni/utilities';

import { useCustomerContext } from '../../context/CustomerContext';
import { Address } from '../Address';
import { AddressForm } from '../AddressForm';


export const AddressBookRow = ({
  address,
  ...props
}) => {
  const { state, updateAddress, deleteAddress } = useCustomerContext();
  const [formActive, setFormActive] = useState(false);

  const isDefault = state.customer.defaultAddress?.id === address.id;

  if (formActive) {
    return (
      <AddressForm
        variant='account.pages.addressBook.form'
        title='Edit Address'
        address={address}
        isDefault={isDefault}
        cancelToggle={() => setFormActive(false)}
        action={updateAddress}
      />
    );
  }

  return (
    <Flex
      variant='account.pages.addressBook.row'
      middle
      {...props}
    >
      <Address
        variant='account.pages.addressBook.row.address'
        address={address}
        type='addressBook'
        isDefault={isDefault}
      />

      <Box variant='account.pages.addressBook.row.edit'>
        <Button
          variant='account.text.addressBook.row.edit'
          onClick={() => setFormActive(true)}
        >
          Edit
        </Button>
      </Box>

      {isBrowser && (
        <Box variant='account.pages.addressBook.row.delete'>
          <Button
            variant='account.text.addressBook.row.delete'
            onClick={() => {
              window.confirm('Are you sure?') && deleteAddress({ id: address.id });
            }}
          >
            Delete
          </Button>
        </Box>
      )}
    </Flex>
  );
};
