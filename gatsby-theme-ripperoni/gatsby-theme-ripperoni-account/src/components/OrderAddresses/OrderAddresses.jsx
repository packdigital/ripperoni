import React from 'react';

import { Box, Flex, Heading, Link, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { Address } from '../Address';


export const Addresses = ({
  shippingAddress,
  fulfillment,
  ...props
}) => (
  <Flex
    between
    variant=''
    {...props}
  >
    <Box width='33.33%'>
      <Heading variant='text.account.order.shippingAddress.heading'>
        Shipping Address
      </Heading>

      <Address
        variant='text.account.order.shippingAddress.address'
        type='Shipping Address'
        address={shippingAddress}
      />
    </Box>

    {fulfillment && (
      <Box
        width='33.33%'
        variant='pages.account.order.fulfillment'
      >
        <Box variant='pages.account.order.fulfillment.header'>
          <Heading variant='text.account.order.fulfillment.heading'>
            Shipping Method
          </Heading>
        </Box>

        {fulfillment?.company && (
          <Box variant='pages.account.order.fulfillment.company'>
            <Text variant='text.account.order.fulfillment.text'>
              Shipped With: <strong>{fulfillment.company}</strong>
            </Text>
          </Box>
        )}

        {fulfillment?.tracking.length && (
          <Link.Button to={fulfillment.tracking[0].url}>
            Track Order
          </Link.Button>
        )}
      </Box>
    )}
  </Flex>
);

Addresses.displayName = 'Order Addresses';
