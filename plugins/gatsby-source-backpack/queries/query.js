"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  query ProductsSubscription ($shopId: String, $ciShopId: citext) {\n    Product: products (\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}},\n        variants: {foreignProductPublishedAt: {_is_null: false}},\n      }\n    ) {\n      ...product\n    }\n    ProductVariant: productVariants (\n      order_by: {id: asc},\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}},\n        foreignProductPublishedAt: {_is_null: false}\n      }\n    ) {\n      ...productVariant\n    }\n    ProductOption: productOptions (\n      order_by: {id: asc},\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}}\n        product: {variants: {foreignProductPublishedAt: {_is_null: false}}}\n      }\n    ) {\n      ...productOption\n    }\n    ProductOptionValue: productOptionValues (\n      order_by: {id: asc},\n      where: {\n        title: {_neq: $ciShopId},\n        variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},\n      }\n    ) {\n      ...productOptionValue\n    }\n    Image: images (\n      order_by: {id: asc},\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}},\n        _or: [\n          {joinProductImages: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}}},\n          {joinVariantImages: {productVariant: {foreignProductPublishedAt: {_is_null: false}}}}\n        ]\n      }\n    ) {\n      ...image\n    }\n  }\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  query GetMeta ($shopId: String, $ciShopId: citext) {\n    Product: products (where: {\n      shop: {shopifyAccount: {id: {_eq: $shopId}}},\n      variants: {foreignProductPublishedAt: {_is_null: false}},\n    }) {\n      id\n      updatedAt\n    }\n    ProductVariant: productVariants (order_by: {id: asc}, where: {\n      shop: {shopifyAccount: {id: {_eq: $shopId}}},\n      foreignProductPublishedAt: {_is_null: false}\n    }) {\n      id\n      updatedAt\n    }\n    ProductOption: productOptions (order_by: {id: asc}, where: {\n      shop: {shopifyAccount: {id: {_eq: $shopId}}}\n      product: {variants: {foreignProductPublishedAt: {_is_null: false}}}\n    }) {\n      id\n      updatedAt\n    }\n    ProductOptionValue: productOptionValues (order_by: {id: asc}, where: {\n      title: {_neq: $ciShopId},\n      variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},\n    }) {\n      id\n      updatedAt\n    }\n    Image: images (order_by: {id: asc}, where: {\n      shop: {shopifyAccount: {id: {_eq: $shopId}}},\n      _or: [\n        {joinProductImages: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}}},\n        {joinVariantImages: {productVariant: {foreignProductPublishedAt: {_is_null: false}}}}\n      ]\n    }) {\n      id\n      updatedAt\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* eslint-disable max-lines */
var gql = require('graphql-tag');

var _require = require('./fragments'),
    PRODUCT_FRAGMENT = _require.PRODUCT_FRAGMENT,
    PRODUCT_VARIANT_FRAGMENT = _require.PRODUCT_VARIANT_FRAGMENT,
    PRODUCT_OPTION_FRAGMENT = _require.PRODUCT_OPTION_FRAGMENT,
    PRODUCT_OPTION_VALUE_FRAGMENT = _require.PRODUCT_OPTION_VALUE_FRAGMENT,
    IMAGE_FRAGMENT = _require.IMAGE_FRAGMENT;

var META_QUERY = gql(_templateObject());
/**
 * When adding a new query, make sure you alias the root field of the result to `data`
 *
 * e.g. result: products
 *      result: productOptionValues
*/

var NEW_NODES_QUERY = gql(_templateObject2(), PRODUCT_FRAGMENT, PRODUCT_VARIANT_FRAGMENT, PRODUCT_OPTION_FRAGMENT, PRODUCT_OPTION_VALUE_FRAGMENT, IMAGE_FRAGMENT);
module.exports = {
  meta: META_QUERY,
  newNodes: NEW_NODES_QUERY
};