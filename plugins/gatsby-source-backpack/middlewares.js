"use strict";

/* eslint-disable max-lines */
const {
  convertToGatsbyGraphQLId
} = require('@packdigital/ripperoni-utilities');

const {
  TYPE_PREFIX,
  PRODUCT,
  PRODUCT_VARIANT,
  PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE,
  IMAGE
} = require('./constants');

const byId = type => ({
  id
}) => convertToGatsbyGraphQLId(id, type, TYPE_PREFIX);

const productMiddleware = node => {
  const foreignIds = node.foreignIds.map(byId());
  const metadata = node.metadata === null ? {} : node.metadata;
  const optionValues = node.options.reduce((map, {
    title,
    values
  }) => ({ ...map,
    [title]: values.map(value => value.title)
  }), {});
  const featuredImage___NODE = node.variants[0].images.length ? convertToGatsbyGraphQLId(node.variants[0].images[0].id, IMAGE, TYPE_PREFIX) : node.images.map(byId(IMAGE))[0];
  const images___NODE = node.images.map(byId(IMAGE));
  const options___NODE = node.options.map(byId(PRODUCT_OPTION));
  const variants___NODE = node.variants.map(byId(PRODUCT_VARIANT));
  delete node.featuredImage;
  delete node.options;
  delete node.images;
  delete node.variants;
  return { ...node,
    foreignIds,
    metadata,
    optionValues,
    featuredImage___NODE,
    options___NODE,
    images___NODE,
    variants___NODE
  };
};

const productVariantMiddleware = node => {
  const firstImage = node.images.find(({
    position
  }) => position === 1) || {};
  const secondImage = node.images.find(({
    position
  }) => position === 2) || {};
  const metadata = node.metadata === null ? {} : node.metadata;
  const selectedOptionsMap = node.selectedOptions.reduce((map, {
    title,
    value
  }) => ({ ...map,
    [title]: value
  }), {});
  const product___NODE = convertToGatsbyGraphQLId(node.productId, PRODUCT, TYPE_PREFIX);
  const images___NODE = node.images.map(byId(IMAGE));
  const image___NODE = convertToGatsbyGraphQLId(firstImage.id, IMAGE, TYPE_PREFIX);
  const hoverImage___NODE = convertToGatsbyGraphQLId(secondImage.id, IMAGE, TYPE_PREFIX);
  const selectedOptions___NODE = node.selectedOptions.map(byId(PRODUCT_OPTION_VALUE));
  delete node.product;
  delete node.images;
  delete node.image;
  delete node.hoverImage;
  delete node.selectedOptions;
  return { ...node,
    metadata,
    selectedOptionsMap,
    product___NODE,
    images___NODE,
    image___NODE,
    hoverImage___NODE,
    selectedOptions___NODE
  };
};

const productOptionMiddleware = node => {
  const product___NODE = convertToGatsbyGraphQLId(node.productId, PRODUCT, TYPE_PREFIX);
  const values___NODE = node.values.map(byId(PRODUCT_OPTION_VALUE));
  delete node.product;
  delete node.values;
  return { ...node,
    product___NODE,
    values___NODE
  };
};

const productOptionValueMiddleware = node => {
  const option___NODE = convertToGatsbyGraphQLId(node.productOptionId, PRODUCT_OPTION, TYPE_PREFIX);
  delete node.option;
  return { ...node,
    option___NODE
  };
};

const imageMiddleware = node => {
  const {
    id,
    src,
    altText,
    updatedAt,
    parent,
    children,
    internal
  } = node;

  if (node.variants && node.variants.length) {
    const {
      variant: firstVariant
    } = node.variants && node.variants[0];
    const match = firstVariant.images.find(({
      id
    }) => id === node.platformId) || {};
    const position = match.position || null;
    const product = convertToGatsbyGraphQLId(firstVariant.productId, PRODUCT, TYPE_PREFIX);
    const variants = node.variants.map(({
      id
    }) => convertToGatsbyGraphQLId(id, PRODUCT_VARIANT, TYPE_PREFIX));
    return {
      id,
      src,
      altText,
      position,
      updatedAt,
      product___NODE: product,
      variants___NODE: variants,
      parent,
      children,
      internal
    };
  }

  if (node.product) {
    return {
      id,
      src,
      altText,
      updatedAt,
      position: node.product.position || null,
      product___NODE: convertToGatsbyGraphQLId(node.product.id, PRODUCT, TYPE_PREFIX),
      variants___NODE: [],
      parent,
      children,
      internal
    };
  }

  return {
    id,
    src,
    altText,
    updatedAt,
    position: null,
    product___NODE: null,
    variants___NODE: [],
    parent,
    children,
    internal
  };
};

module.exports = {
  [PRODUCT]: productMiddleware,
  [PRODUCT_VARIANT]: productVariantMiddleware,
  [PRODUCT_OPTION]: productOptionMiddleware,
  [PRODUCT_OPTION_VALUE]: productOptionValueMiddleware,
  [IMAGE]: imageMiddleware
};