import React, { useContext, useState } from 'react';

import { Box, Button, Flex, Text } from '@ripperoni/components';

import { CustomerContext } from '../../context/CustomerContext';
import { Address } from '../Address';
import { AddressForm } from '../AddressForm';


export const AddressBookRow = ({
  address,
  ...props
}) => {
  const { updateAddress } = useContext(CustomerContext);
  const [formActive, setFormActive] = useState(false);

  if (formActive) {
    return (
      <AddressForm
        title='Edit Address'
        address={address}
        cancelToggle={() => setFormActive(false)}
        action={updateAddress}
      />
    );
  }

  return (
    <Flex
      variant='pages.account.addressBook.row'
      between
      middle
      {...props}
    >
      <Address
        variant='text.account.addressBook.address'
        address={address}
      />

      <Box variant='pages.account.addressBook.formControls'>
        <Button.Link onClick={() => setFormActive(true)}>
          <Text variant='text.account.addressBook.formToggle'>Edit</Text>
        </Button.Link>

        <Button.Link onClick={() => {}}>
          <Text variant='text.account.addressBook.formToggle'>Delete</Text>
        </Button.Link>
      </Box>
    </Flex>
  );
};
