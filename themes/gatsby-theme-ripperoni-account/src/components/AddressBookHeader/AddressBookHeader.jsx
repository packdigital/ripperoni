import React from 'react';

import { Flex, Heading } from '@ripperoni/components';


export const AddressBookHeader = props => {
  return (
    <Flex
      between
      middle
      variant='account.addressBook.header'
      {...props}
    >
      <Heading variant='account.text.addressBook.heading'>
        Address Book
      </Heading>
    </Flex>
  );
};
