import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Flex, Image, Link, Price, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


export const LineItems = ({
  lineItems,
  ...props
}) => {
  console.log('lineItems', lineItems);
  const { fallbackImage } = useStaticQuery(staticQuery);

  return lineItems.map(({ variant, title, fallbackPrice }, index) => (
    <Flex
      variant='pages.account.order.lineItem'
      middle
      key={index}
      {...props}
    >
      <Link>
        <Image
          width='80px'
          src={variant?.image?.src || fallbackImage.src}
          alt={variant?.image?.altText}
        />
      </Link>

      <Box variant='pages.account.order.lineItem.meta'>
        <Text variant='text.account.order.lineItem.variant'>
          {variant?.title}
        </Text>

        <Text variant='text.account.order.lineItem.title'>
          {title}
        </Text>
      </Box>

      <Box variant='pages.account.order.lineItem.price'>
        <Price variant='text.account.order.lineItem.price'>
          {variant?.price?.amount || fallbackPrice?.amount}
        </Price>

        {variant?.compareAtPrice?.amount && (
          <Price variant='text.account.order.lineItem.compareAtPrice'>
            {variant.compareAtPrice.amount}
          </Price>
        )}
      </Box>
    </Flex>
  ));
};

LineItems.displayName = 'Order Line Items';

const staticQuery = graphql`
  {
    fallbackImage: file (base: {eq: "logo.png"}) {
      src: publicURL
    }
  }
`;
