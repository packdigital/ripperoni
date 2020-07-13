/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from '@ripperoni/components';


export const Address = ({
  address,
  isDefault,
  type = 'default',
  ...props
}) => {
  return (
    <Box
      data-comp={`${Address.displayName}: ${type}`}
      variant={`account.address.${type}`}
      {...props}
    >
      <Box variant={`account.address.${type}.name`}>
        <Text variant={`account.text.address.${type}.name`}>
          {`${address.firstName} ${address.lastName}`}
          {isDefault && ' (Default)'}
        </Text>
      </Box>

      <Box variant={`account.address.${type}.address1`}>
        <Text variant={`account.text.address.${type}.address1`}>
          {address.address1}
        </Text>
      </Box>

      <Box variant={`account.address.${type}.address2`}>
        {address.address2 && (
          <Text variant={`account.text.address.${type}.address2`}>
            {address.address2}
          </Text>
        )}
      </Box>

      <Box variant={`account.address.${type}.company`}>
        {address.company && (
          <Text variant={`account.text.address.${type}.company`}>
            {address.company}
          </Text>
        )}
      </Box>

      <Box variant={`account.address.${type}.cityStateZip`}>
        <Text variant={`account.text.address.${type}.cityStateZip`}>
          {`${address.city}, ${address.provinceCode} ${address.zip}`}
        </Text>
      </Box>

      <Box variant={`account.address.${type}.country`}>
        <Text variant={`account.text.address.${type}.country`}>
          {`${address.country}`}
        </Text>
      </Box>
    </Box>
  );
};

Address.displayName = 'Account Address';

Address.propTypes = {
  type: PropTypes.string,
};
