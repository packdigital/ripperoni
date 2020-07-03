import React, { useContext } from 'react';

import { Flex } from '@ripperoni/components';

import { AccountLayout } from '../layout/AccountLayout';
import { LoggedInPageHeader } from '../components/LoggedInPageHeader';
import { AddressForm } from '../components/AddressForm';
import { CustomerContext } from '../context/CustomerContext';
import { AddressBookRow } from '../components/AddressBookRow';


export const AddressBook = props => {
  const { state, createAddress } = useContext(CustomerContext);

  return (
    <AccountLayout
      loggedIn={true}
      {...props}
    >
      <LoggedInPageHeader heading='Address Book' />

      <Flex.Col>
        {state.customer.addresses.map(address => (
          <AddressBookRow
            address={address}
            key={address.id}
          />
        ))}

        <AddressForm
          title='Add A New Address'
          action={createAddress}
        />
      </Flex.Col>
    </AccountLayout>
  );
};
