import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Heading, Link, Text } from '@ripperoni/components';

import { Address } from '../Address';


export const Addresses = ({
  shippingAddress,
  fulfillment,
  ...props
}) => (
  <Flex
    data-comp={Addresses.displayName}
    variant='account.pages.order.addresses'
    between
    {...props}
  >
    <Box variant='account.pages.order.addresses.shipping'>
      <Box variant='account.pages.order.addresses.shipping.header'>
        <Heading variant='account.text.order.addresses.shipping.heading'>
          Shipping Address
        </Heading>
      </Box>

      <Address
        variant='account.pages.order.addresses.shipping.address'
        type='shipping'
        address={shippingAddress}
      />
    </Box>

    {fulfillment && (
      <Box variant='account.pages.order.addresses.fulfillment'>
        <Box variant='account.pages.order.addresses.fulfillment.header'>
          <Heading variant='account.text.order.addresses.fulfillment.heading'>
            Shipping Method
          </Heading>
        </Box>

        {fulfillment?.company && (
          <Box variant='account.pages.order.addresses.fulfillment.company'>
            <Text variant='account.text.order.addresses.fulfillment.company'>
              Shipped With: {fulfillment.company}
            </Text>
          </Box>
        )}

        {fulfillment?.tracking.length && (
          <Link
            variant='account.pages.order.addresses.fulfillment.trackOrder'
            href={fulfillment.tracking[0].url}
          >
            Track Order
          </Link>
        )}
      </Box>
    )}
  </Flex>
);

Addresses.displayName = 'Order Addresses';

Addresses.propTypes = {
  shippingAddress: PropTypes.object,
  fulfillment: PropTypes.object,
};
