"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

function _templateObject5() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  subscription ImagesSubscription ($shopId: String) {\n    result: images (\n      order_by: {id: asc},\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}},\n        _or: [\n          {joinProductImages: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}}},\n          {joinVariantImages: {productVariant: {foreignProductPublishedAt: {_is_null: false}}}}\n        ]\n      }\n    ) {\n      ...image\n    }\n  }\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  subscription ProductOptionValuesSubscription ($shopId: citext) {\n    result: productOptionValues (\n      order_by: {id: asc},\n      where: {\n        title: {_neq: $shopId},\n        variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},\n      }\n    ) {\n      ...productOptionValue\n    }\n  }\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  subscription ProductOptionsSubscription ($shopId: String) {\n    result: productOptions (\n      order_by: {id: asc},\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}}\n        product: {variants: {foreignProductPublishedAt: {_is_null: false}}}\n      }\n    ) {\n      ...productOption\n    }\n  }\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  subscription ProductVariantsSubscription ($shopId: String) {\n    result: productVariants (\n      order_by: {id: asc},\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}},\n        foreignProductPublishedAt: {_is_null: false}\n      }\n    ) {\n      ...productVariant\n    }\n  }\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  subscription ProductsSubscription ($shopId: String) {\n    result: products (\n      where: {\n        shop: {shopifyAccount: {id: {_eq: $shopId}}},\n        variants: {foreignProductPublishedAt: {_is_null: false}},\n      }\n    ) {\n      ...product\n    }\n  }\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var gql = require('graphql-tag');

var _require = require('./fragments'),
    PRODUCT_FRAGMENT = _require.PRODUCT_FRAGMENT,
    PRODUCT_VARIANT_FRAGMENT = _require.PRODUCT_VARIANT_FRAGMENT,
    PRODUCT_OPTION_FRAGMENT = _require.PRODUCT_OPTION_FRAGMENT,
    PRODUCT_OPTION_VALUE_FRAGMENT = _require.PRODUCT_OPTION_VALUE_FRAGMENT,
    IMAGE_FRAGMENT = _require.IMAGE_FRAGMENT;
/**
 *
 * When adding a new query, make sure you alias the root field of the result to `data`
 *
 * e.g. result: products
 *      result: productOptionValues
 *
*/


var PRODUCTS_SUBSCRIPTION = gql(_templateObject(), PRODUCT_FRAGMENT);
var PRODUCT_VARIANTS_SUBSCRIPTION = gql(_templateObject2(), PRODUCT_VARIANT_FRAGMENT);
var PRODUCT_OPTIONS_SUBSCRIPTION = gql(_templateObject3(), PRODUCT_OPTION_FRAGMENT);
var PRODUCT_OPTION_VALUES_SUBSCRIPTION = gql(_templateObject4(), PRODUCT_OPTION_VALUE_FRAGMENT);
var IMAGES_SUBSCRIPTION = gql(_templateObject5(), IMAGE_FRAGMENT);
module.exports = {
  product: PRODUCTS_SUBSCRIPTION,
  productVariant: PRODUCT_VARIANTS_SUBSCRIPTION,
  productOption: PRODUCT_OPTIONS_SUBSCRIPTION,
  productOptionValue: PRODUCT_OPTION_VALUES_SUBSCRIPTION,
  image: IMAGES_SUBSCRIPTION
};