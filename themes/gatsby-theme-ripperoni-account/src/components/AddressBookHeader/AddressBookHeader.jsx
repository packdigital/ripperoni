import React from 'react';

import { Flex, Heading } from '@ripperoni/components';


export const AddressBookHeader = props => {
  return (
    <Flex
      between
      middle
      variant='pages.account.addressBook.header'
      {...props}
    >
      <Heading variant='text.account.addressBook.heading'>
        Address Book
      </Heading>
    </Flex>
  );
};
