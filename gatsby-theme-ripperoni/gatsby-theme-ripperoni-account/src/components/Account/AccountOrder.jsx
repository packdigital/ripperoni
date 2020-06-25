/** @jsx jsx */
import React from 'react';
import { Box, Flex, Heading, Text, jsx } from 'theme-ui';
import { navigate } from 'gatsby';

import { titleCase } from '@utils';

import Link from '@theme/components/Link';
import Image from '@theme/components/Image';

import { FlexCol, FlexRow } from '@theme2/components';

import useGlobal from '@theme/store';

import Price from '@components/Price';
import { AccountLayout } from '@components/Account/AccountLayout';

import CutsLogo from '@assets/images/cuts-emblem.svg';


export const AccountOrder = props => {
  const [{ customer }] = useGlobal();
  const order = props.location.state?.order || customer.orders.find(({ id }) => id === parseInt(props.id));

  if (!order) {
    navigate('/account');

    return null;
  }

  return (
    <AccountLayout {...props}>
      <FlexRow
        between
        middle
        mb={7}
      >
        <Heading>{`Order #${order.id}`}</Heading>

        <Text variant='text.s'>{new Date(order.date).toDateString()}</Text>
      </FlexRow>

      <FlexCol
        p='30px'
        bg='white'
      >
        <ShippingSeciton
          mb={12}
          shippingAddress={order.shippingAddress}
          shippingPrice={order.shippingPrice}
          fulfillments={order.fulfillments}
        />

        <LineItems
          mb={12}
          lineItems={order.lineItems}
        />

        <Totals
          subtotal={order.subtotalPrice}
          shipping={order.shippingPrice}
          tax={order.totalTax}
          totalPrice={order.totalPrice}
        />
      </FlexCol>
    </AccountLayout>
  );
};

const ShippingSeciton = ({ shippingAddress, shippingPrice, fulfillments, ...props }) => (
  <FlexRow
    between
    {...props}
  >
    {shippingAddress && (
      <FlexCol sx={{ flexBasis: '33.33%' }}>
        <Text
          variant='text.s'
          mb={1}
        >
          Shipping Address
        </Text>
        <Text variant='text.m'>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</Text>
        <Text variant='text.m'>{shippingAddress?.company}</Text>
        <Text variant='text.m'>{shippingAddress?.address1}</Text>
        <Text variant='text.m'>{shippingAddress?.address2}</Text>
        <Text variant='text.m'>{`${shippingAddress?.city}, ${shippingAddress?.province} ${shippingAddress?.zip}`}</Text>
        <Text variant='text.m'>{shippingAddress?.country}</Text>
      </FlexCol>
    )}

    {fulfillments.length > 0 && (
      <FlexCol sx={{ flexBasis: '33.33%' }}>
        <Text
          variant='text.s'
          mb={1}
        >
          Shipping Method
        </Text>

        <Text
          variant='text.m'
          as={Price}
        >
          {shippingPrice.amount}
        </Text>

        <Text variant='text.m'>{fulfillments[0]?.company}</Text>

        {fulfillments[0]?.tracking[0] && (
          <Link
            to={fulfillments[0]?.tracking[0].url}
            variant='button'
            sx={{
              mt: 3,
              width: '110px',
            }}
          >
            Track Order
          </Link>
        )}
      </FlexCol>
    )}
  </FlexRow>
);

const LineItems = ({ lineItems, ...props }) => (
  <FlexCol {...props}>
    {lineItems.map(({ title, variant, fallbackPrice, discountedPrice }, index) => (
      <FlexRow
        middle
        key={title}
        sx={{
          py: 3,
          borderBottom: '1px solid lightgray',
          borderTop: index === 0 && '1px solid lightgray',
        }}
      >
        <Box sx={{ mr: 8, width: '80px' }}>{variant ? <Image
          src={variant.image.src}
          alt={variant.image.altText}
                                                      /> : <FallbackImage />}</Box>
        <Box mr={9}>
          <Text variant='text.xs'>{variant?.title}</Text>
          <Text variant='text.s'>{title}</Text>
        </Box>

        <Flex ml='auto'>
          <Price>{variant?.price?.amount || fallbackPrice?.amount}</Price>
          {variant?.compareAtPrice?.amount && (
            <Price
              ml={3}
              variant='text.sale'
            >
              {variant?.compareAtPrice?.amount}
            </Price>
          )}
        </Flex>
      </FlexRow>
    ))}
  </FlexCol>
);

const FallbackImage = () => (
  <FlexCol
    middle
    sx={{
      p: '15px',
      width: '80px',
      height: '105px',
      bg: 'lightgray',
    }}
  >
    <CutsLogo />
  </FlexCol>
);

const Totals = ({ subtotal, shipping, tax, totalPrice, ...props }) => (
  <FlexCol
    right
    sx={{ width: '155px', alignSelf: 'flex-end' }}
    {...props}
  >
    <TotalPrice
      mb={1}
      name='subtotal'
      amount={subtotal.amount}
    />

    <TotalPrice
      mb={1}
      name='shipping'
      amount={shipping.amount}
    />

    <TotalPrice
      mb={3}
      name='tax'
      amount={tax.amount}
    />

    <TotalPrice
      name='total'
      amount={totalPrice.amount}
      sx={{
        pt: 3,
        borderTop: '1px solid lightgray',
      }}
    />
  </FlexCol>
);

const TotalPrice = ({ name, amount, ...props }) => {
  if (parseInt(amount) <= 0) return null;

  return (
    <FlexRow
      right
      middle
      {...props}
    >
      <Text
        variant='text.s'
        sx={{
          pr: 3,
          flex: 8,
          textAlign: 'right',
        }}
      >
        {`${titleCase(name)}:`}
      </Text>
      <Price sx={{ flex: 4 }}>{amount}</Price>
    </FlexRow>
  );
};

export default AccountOrder;
