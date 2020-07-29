/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from '@ripperoni/components';


export const Address = ({
  address,
  isDefault,
  type,
  ...props
}) => {
  return (
    <Box
      data-comp={`${Address.displayName}: ${type}`}
      variant={`account.${type}.address`}
      {...props}
    >
      <Box variant={`account.${type}.address.name`}>
        <Text variant={`account.text.${type}.address.name`}>
          {`${address.firstName} ${address.lastName}`}
          {isDefault && ' (Default)'}
        </Text>
      </Box>

      <Box variant={`account.${type}.address.address1`}>
        <Text variant={`account.text.${type}.address.address1`}>
          {address.address1}
        </Text>
      </Box>

      <Box variant={`account.${type}.address.address2`}>
        {address.address2 && (
          <Text variant={`account.text.${type}.address.address2`}>
            {address.address2}
          </Text>
        )}
      </Box>

      <Box variant={`account.${type}.address.company`}>
        {address.company && (
          <Text variant={`account.text.${type}.address.company`}>
            {address.company}
          </Text>
        )}
      </Box>

      <Box variant={`account.${type}.address.cityStateZip`}>
        <Text variant={`account.text.${type}.address.cityStateZip`}>
          {`${address.city}, ${address.provinceCode} ${address.zip}`}
        </Text>
      </Box>

      <Box variant={`account.${type}.address.country`}>
        <Text variant={`account.text.${type}.address.country`}>
          {`${address.country}`}
        </Text>
      </Box>
    </Box>
  );
};

Address.displayName = 'Account Address';

Address.propTypes = {
  type: PropTypes.string.isRequired,
};
