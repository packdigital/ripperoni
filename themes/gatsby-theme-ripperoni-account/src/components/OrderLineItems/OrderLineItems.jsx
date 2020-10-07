import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import { Flex } from '@ripperoni/components';

import { LineItem } from './OrderLineItem';


export const OrderLineItems = ({
  statusUrl,
  lineItems,
  ...props
}) => {
  const { fallbackImage } = useStaticQuery(staticQuery);

  return (
    <Flex.Col
      variant='account.order.lineItems'
      {...props}
    >
      {lineItems.map((lineItem, index) => (
        <LineItem
          title={lineItem.title}
          variantTitle={lineItem.variant?.title}
          quantity={lineItem.quantity}
          url={lineItem.variant?.product?.url || statusUrl}
          image={lineItem.variant?.image || fallbackImage}
          price={lineItem.variant?.price?.amount || lineItem.fallbackPrice.amount}
          compareAtPrice={lineItem.variant?.compareAtPrice?.amount || lineItem.fallbackCompareAtPrice.amount}
          key={index}
        />
      ))}
    </Flex.Col>
  );
};

OrderLineItems.displayName = 'Order Line Items';

OrderLineItems.propTypes = {
  statusUrl: PropTypes.string,
  lineItems: PropTypes.arrayOf(PropTypes.object)
};

const staticQuery = graphql`
  {
    fallbackImage: file (base: {eq: "logo.png"}) {
      src: publicURL
      altText: name
    }
  }
`;
