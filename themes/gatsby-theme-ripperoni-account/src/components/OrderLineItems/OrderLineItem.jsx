import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Image, Link, Price, Text } from '@ripperoni/components';

import { QuantityBadge } from './OrderLineItemQuantityBadge';


export const LineItem = ({
  title,
  variantTitle,
  quantity,
  url,
  image,
  price,
  compareAtPrice,
  ...props
}) => {
  return (
    <Flex
      data-comp={LineItem.displayName}
      variant='account.order.lineItem'
      middle
      {...props}
    >
      <Link
        href={url}
        newWindow={true}
        position='relative'
        sx={{ variant: 'links.plain' }}
      >
        <QuantityBadge>
          {quantity}
        </QuantityBadge>

        <Image
          variant='account.order.lineItem.image'
          src={image.src}
          alt={image.altText}
        />
      </Link>

      <Flex
        variant='account.order.lineItem.meta'
        as={Link}
        href={url}
        newWindow={true}
        sx={{ variant: 'links.plain' }}
      >
        {variantTitle && (
          <Text variant='account.text.order.lineItem.variant'>
            {variantTitle}
          </Text>
        )}

        <Text variant='account.text.order.lineItem.title'>
          {title}
        </Text>
      </Flex>

      <Box variant='account.order.lineItem.price'>
        <Price variant='account.text.order.lineItem.price'>
          {price}
        </Price>

        {price < compareAtPrice && (
          <Price variant='account.text.order.lineItem.compareAtPrice'>
            {compareAtPrice}
          </Price>
        )}
      </Box>
    </Flex>
  );
};

LineItem.displayName = 'Order Line Item';

LineItem.propTypes = {
  title: PropTypes.string,
  variantTitle: PropTypes.string,
  quantity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  url: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    altText: PropTypes.string,
  }),
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  compareAtPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
