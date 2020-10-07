/**
 * @prettier
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Heading, Link, Text } from '@ripperoni/components';

import { Address } from '../Address';

export const OrderAddresses = ({ shippingAddress, fulfillment, ...props }) => (
  <Flex
    data-comp={OrderAddresses.displayName}
    variant='account.order.addresses'
    between
    {...props}
  >
    <Box variant='account.order.addresses.shipping'>
      <Box variant='account.order.addresses.shipping.header'>
        <Heading variant='account.text.order.addresses.shipping.heading'>
          Shipping Address
        </Heading>
      </Box>

      <Address
        variant='account.order.addresses.shipping.address'
        address={shippingAddress}
        type='order'
      />
    </Box>

    {fulfillment && (
      <Box variant='account.order.addresses.fulfillment'>
        <Box variant='account.order.addresses.fulfillment.header'>
          <Heading variant='account.text.order.addresses.fulfillment.heading'>
            Shipping Method
          </Heading>
        </Box>

        {fulfillment?.company && (
          <Box variant='account.order.addresses.fulfillment.company'>
            <Text variant='account.text.order.addresses.fulfillment.company'>
              Shipped With: {fulfillment.company}
            </Text>
          </Box>
        )}

        {fulfillment?.tracking.length && (
          <Link
            variant='account.order.addresses.fulfillment.trackOrder'
            href={fulfillment.tracking[0].url}
          >
            Track Order
          </Link>
        )}
      </Box>
    )}
  </Flex>
);

OrderAddresses.displayName = 'Order Addresses';

OrderAddresses.propTypes = {
  shippingAddress: PropTypes.object,
  fulfillment: PropTypes.object,
};
