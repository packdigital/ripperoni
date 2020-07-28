import React from 'react';

import { Flex, Image, Link } from '@ripperoni/components';


export const CartLineItem = ({
  title,
  quantity,
  variant,
  ...props
}) => {
  return (
    <Flex {...props}>
      <Link
        href={url}
        newWindow={true}
        position='relative'
        sx={{ variant: 'links.plain' }}
      >
        <Image
          variant='account.pages.order.lineItem.image'
          src={image.src}
          alt={image.altText}
        />
      </Link>
    </Flex>
  );
};
