/** @jsx jsx */
import { useState } from 'react';
import { Box, Button, Flex, Heading, Text, jsx } from 'theme-ui';

import { isBrowser } from '@utils';

import { FlexCol, FlexRow } from '@theme2/components';

import useCustomer from '@theme/hooks/useCustomer';

import { AddressForm } from '@components/Account/AccountAddressForm';


export const Address = props => {
  const [editActive, setEditActive] = useState(false);
  const toggleEditForm = () => setEditActive(!editActive);

  return (
    <Box>
      {editActive
        ? (
          <AddressForm
            {...props}
            toggleEditForm={toggleEditForm}
          />
        )
        : (
          <DisplayAddress
            {...props}
            toggleEditForm={toggleEditForm}
          />
        )}
    </Box>
  );
};

const DisplayAddress = ({
  title,
  address = {},
  isDefault,
  canDelete = true,
  toggleEditForm
}) => {
  const actions = useCustomer();

  return (
    <FlexRow
      middle
      between
      mb={3}
      bg='white'
      p={[10, null, null, null, 12]}
    >
      <FlexCol>
        <Heading
          variant='text.s'
          mb={1}
        >
          {title}
        </Heading>
        <FlexRow middle>
          <Text variant='text.m'>{`${address.firstName} ${address.lastName}`}</Text>

          {isDefault && (
            <Text
              variant='text.smallUpcase'
              ml={3}
            >
              (Default)
            </Text>
          )}
        </FlexRow>
        <Text variant='text.m'>{address.company}</Text>
        <Text variant='text.m'>{address.address1}</Text>
        <Text variant='text.m'>{address.address2}</Text>
        <Text variant='text.m'>
          {`${address.city}, ${address.province} ${address.zip}`}
        </Text>
        <Text variant='text.m'>{address.country}</Text>
      </FlexCol>

      <Flex>
        <Button
          color='text'
          variant='link'
          onClick={toggleEditForm}
        >
          Edit
        </Button>

        {canDelete && (
          <Button
            ml={10}
            variant='link'
            onClick={() => {
              if (isBrowser && window.confirm('Are you sure?')) {
                actions.address.delete({ id: address.id });
              }
            }}
          >
            Delete
          </Button>
        )}
      </Flex>
    </FlexRow>
  );
};
