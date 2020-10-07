import React from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { AddressForm } from '../components/AddressForm';
import { AddressBookHeader } from '../components/AddressBookHeader';
import { useCustomerContext } from '../context/CustomerContext';
import { AddressBookRow } from '../components/AddressBookRow';


export const AddressBook = props => {
  const { state, createAddress } = useCustomerContext();

  return (
    <AccountLayout
      variant='account.layout.addressBook'
      loggedIn={true}
      {...props}
    >
      <AddressBookHeader />

      <Flex.Col>
        {state.customer.addresses.map(address => (
          <AddressBookRow
            address={address}
            key={address.id}
          />
        ))}

        <AddressForm
          variant='account.addressBook.form'
          title='Add A New Address'
          action={createAddress}
        />
      </Flex.Col>
    </AccountLayout>
  );
};
