import React from 'react';
import PropTypes from 'prop-types';

import { getLegacyShopifyId } from '@ripperoni/utilities';
import {
  Box,
  Button,
  ClientSideOnly,
  Flex,
  Heading,
  Image,
  Link,
  Price,
  Svg,
  Text,
} from '@ripperoni/components';

import Close from '../../assets/images/close.svg';
import { QuantitySelect } from '../QuantitySelect';
import { useRemoveItemFromCart } from '../../hooks/useRemoveItemFromCart';

export const CartLineItem = ({ id, title, quantity, variant, ...props }) => {
  const removeItemFromCart = useRemoveItemFromCart();

  const { selectedOptions, image, price, compareAtPrice } = variant || {};
  const options = selectedOptions
    .map(({ name, value }) => `${name} - ${value}`)
    .join(' / ');

  return (
    <ClientSideOnly>
      <Flex
        data-comp={CartLineItem.displayName}
        data-variantid={getLegacyShopifyId(variant.id)}
        pb='12px'
        mb='12px'
        sx={{
          borderBottom: 'thin solid',
          borderColor: '#efefef',
        }}
        {...props}
      >
        <Link
          href='#'
          position='relative'
          maxWidth='75px'
          width='100%'
          mr='22px'
          sx={{ variant: 'links.plain' }}
        >
          <Image
            src={image?.src}
            alt={image?.altText}
            imgStyle={{
              width: '100%',
            }}
          />
        </Link>

        <Flex.Col middle>
          <Text
            mb='8px'
            size='10px'
            weight='500'
            letterSpacing='1px'
            variant='cart.text.lineItem.secondaryTitle'
          >
            {options}
          </Text>

          <Heading
            mb='10px'
            size='13px'
            weight='bold'
            textTransform='uppercase'
            variant='cart.text.lineItem.primaryTitle'
          >
            {title}
          </Heading>

          <QuantitySelect
            width='75px'
            height='23px'
            id={id}
            quantity={quantity}
          />
        </Flex.Col>

        <Flex.Col right ml='auto' pl='22px'>
          <Button.Plain mb='auto' onClick={() => removeItemFromCart(id)}>
            <Svg as={Close} width='10px' />
          </Button.Plain>

          <Box mb='0'>
            {compareAtPrice && (
              <Price fontSize='13px' variant='text.sale'>
                {compareAtPrice}
              </Price>
            )}

            <Price fontSize='13px'>{price}</Price>
          </Box>
        </Flex.Col>
      </Flex>
    </ClientSideOnly>
  );
};

CartLineItem.displayName = 'Cart Line Item';

CartLineItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.object,
};
