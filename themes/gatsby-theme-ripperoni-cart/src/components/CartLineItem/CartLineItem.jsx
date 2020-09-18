import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Flex, Heading, Image, Link, Price, Svg, Text } from '@ripperoni/components';
import { QuantitySelect } from '@ripperoni/cart/components/QuantitySelect';
import Close from '@ripperoni/cart/assets/images/close.svg';
import { useCartContext } from '@ripperoni/cart/context/CartContext';
import { getLegacyShopifyId, isBrowser } from '@ripperoni/utilities';

export const CartLineItem = ({
  id,
  title,
  quantity,
  variant,
  ...props
}) => {
  const { removeLineItems } = useCartContext();

  const { selectedOptions, image, price, compareAtPrice } = variant || {};
  const options = selectedOptions
    .map(({ name, value }) => `${name} - ${value}`)
    .join(' / ');

  if (!isBrowser) return null;

  return (
    <Flex
      data-comp={CartLineItem.displayName}
      data-variantid={getLegacyShopifyId(variant.id)}
      pb='25px'
      {...props}
    >
      <Link
        href='#'
        position='relative'
        width='80px'
        mr='22px'
        sx={{ variant: 'links.plain' }}
      >
        <Image
          src={image?.src}
          alt={image?.altText}
        />
      </Link>

      <Flex.Col middle>
        <Text
          mb='4px'
          size='10px'
          weight='bold'
          letterSpacing='1px'
          variant='cart.text.lineItem.secondaryTitle'
        >
          { options }
        </Text>

        <Heading
          mb='10px'
          size='13px'
          weight='bold'
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

      <Flex.Col
        right
        ml='auto'
        pl='22px'
      >
        <Button.Plain
          mb='auto'
          onClick={() => removeLineItems([ id ])}
        >
          <Svg
            as={Close}
            width='10px'
          />
        </Button.Plain>

        <Box mb='auto'>
          {compareAtPrice && (
            <Price
              fontSize='13px'
              variant='text.sale'
            >
              {compareAtPrice}
            </Price>
          )}

          <Price fontSize='13px'>
            {price}
          </Price>
        </Box>
      </Flex.Col>
    </Flex>
  );
};

CartLineItem.displayName = 'Cart Line Item';

CartLineItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  quantity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  variant: PropTypes.object,
};
