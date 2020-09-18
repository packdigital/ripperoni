/**
 * @prettier
 */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Box, Button, Flex, Loader } from '@ripperoni/components';
import { isBrowser } from '@ripperoni/utilities';

import { useCustomerContext } from '../../context/CustomerContext';
import { Address } from '../Address';
import { AddressForm } from '../AddressForm';

export const AddressBookRow = ({ address, ...props }) => {
  const { state, updateAddress, deleteAddress } = useCustomerContext();
  const { customer, loading } = state;
  const [formActive, setFormActive] = useState(false);

  const isDefault = customer.defaultAddress?.id === address.id;

  if (formActive) {
    return (
      <AddressForm
        variant='account.addressBook.form'
        title='Edit Address'
        address={address}
        isDefault={isDefault}
        cancelToggle={() => setFormActive(false)}
        action={updateAddress}
      />
    );
  }

  return (
    <Flex variant='account.addressBook.row' between middle {...props}>
      <Address
        variant='account.addressBook.row.address'
        address={address}
        type='addressBook'
        isDefault={isDefault}
      />

      <Flex variant='account.addressBook.row.controls' between>
        <Loader.Hoc loading={loading?.[address.id]} mr='45px'>
          <Box variant='account.addressBook.row.controls.edit'>
            <Button
              variant='account.text.addressBook.row.edit'
              onClick={() => setFormActive(true)}
            >
              Edit
            </Button>
          </Box>

          {isBrowser && (
            <Box variant='account.addressBook.row.controls.delete'>
              <Button
                variant='account.text.addressBook.row.delete'
                onClick={() => {
                  window.confirm('Are you sure?') &&
                    deleteAddress({ id: address.id });
                }}
              >
                Delete
              </Button>
            </Box>
          )}
        </Loader.Hoc>
      </Flex>
    </Flex>
  );
};
