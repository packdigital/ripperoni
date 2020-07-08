import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Flex, Image, Link, Price, Text } from '@ripperoni/components';


export const LineItems = ({
  statusUrl,
  lineItems,
  ...props
}) => {
  console.log('lineItems', lineItems);
  const { fallbackImage } = useStaticQuery(staticQuery);

  return (
    <Flex.Col
      variant='pages.account.order.lineItems'
      {...props}
    >
      {lineItems.map(({ variant, title, fallbackPrice, fallbackCompareAtPrice }, index) => (
        <Flex
          variant='pages.account.order.lineItem'
          middle
          key={index}
          {...props}
        >
          <Link
            href={variant?.product?.url || statusUrl}
            newWindow={true}
            sx={{ variant: 'links.plain' }}
          >
            <Image
              width='80px'
              src={variant?.image?.src || fallbackImage.src}
              alt={variant?.image?.altText}
            />
          </Link>

          <Link
            href={variant?.product?.url || statusUrl}
            newWindow={true}
            sx={{ variant: 'links.plain' }}
          >
            <Box variant='pages.account.order.lineItem.meta'>
              <Text variant='text.account.order.lineItem.variant'>
                {variant?.title}
              </Text>

              <Text variant='text.account.order.lineItem.title'>
                {title}
              </Text>
            </Box>
          </Link>

          <Box variant='pages.account.order.lineItem.price'>
            <Price variant='text.account.order.lineItem.price'>
              {variant?.price?.amount || fallbackPrice?.amount}
            </Price>

            {variant?.compareAtPrice?.amount || fallbackPrice < fallbackCompareAtPrice && (
              <Price variant='text.account.order.lineItem.compareAtPrice'>
                {variant?.compareAtPrice?.amount || fallbackCompareAtPrice?.amount}
              </Price>
            )}
          </Box>
        </Flex>
      ))}
    </Flex.Col>
  );
};

LineItems.displayName = 'Order Line Items';

LineItems.propTypes = {
  statusUrl: PropTypes.string,
  lineItems: PropTypes.arrayOf(PropTypes.object)
};


const staticQuery = graphql`
  {
    fallbackImage: file (base: {eq: "logo.png"}) {
      src: publicURL
    }
  }
`;
