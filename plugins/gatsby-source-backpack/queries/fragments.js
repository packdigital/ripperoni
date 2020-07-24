"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

function _templateObject5() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  fragment image on images {\n    id\n      src\n      altText\n      product {\n        id: productId\n        position\n      }\n      variants: joinVariantImages {\n        id: productVariantId\n        variant: productVariant {\n          id\n          productId\n          images (order_by: {position: asc}) {\n            id\n            position\n          }\n        }\n      }\n      updatedAt\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  fragment productOptionValue on productOptionValues {\n    id\n    productOptionId\n    position\n    title\n    updatedAt\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  fragment productOption on productOptions {\n    id\n    productId\n    position\n    title\n    values (\n      order_by: {position: asc},\n      where: {variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}}}\n    ) {\n      id\n      title\n      position\n    }\n    updatedAt\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  fragment productVariant on productVariants {\n    id\n    foreignId\n    productId\n    productForeignId\n    foreignProductHandle\n    foreignProductPublishedAt\n    available\n    inventory\n    price\n    compareAtPrice\n    metadata\n    sku\n    images (order_by: {position: asc}) {\n      id\n      position\n    }\n    selectedOptions (order_by: {optionPosition: asc}) {\n      id\n      title\n      value\n    }\n    updatedAt\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  fragment product on products {\n    id\n    title\n    handle\n    description\n    available\n    metadata\n    type\n    images (order_by: {position: asc}) {\n      id\n      position\n    }\n    options (\n      order_by: {position: asc},\n      where: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}},\n    ) {\n      id\n      title\n      values (\n        order_by: {position: asc},\n        where: {variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}}},\n      ) {\n        id\n        title\n      }\n    }\n    variants (\n      order_by: {position: asc},\n      where: {foreignProductPublishedAt: {_is_null: false}},\n    ) {\n      id\n      selectedOptions (order_by: {optionPosition: asc}) {\n        id\n        title\n        value\n      }\n      images (order_by: {position: asc}) {\n        id\n        foreignId\n        productVariantId\n        position\n      }\n    }\n    foreignIds: variants(distinct_on: productForeignId) {\n      id: productForeignId\n    }\n    updatedAt\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* eslint-disable max-lines */
var gql = require('graphql-tag');

var PRODUCT_FRAGMENT = gql(_templateObject());
var PRODUCT_VARIANT_FRAGMENT = gql(_templateObject2());
var PRODUCT_OPTION_FRAGMENT = gql(_templateObject3());
var PRODUCT_OPTION_VALUE_FRAGMENT = gql(_templateObject4());
var IMAGE_FRAGMENT = gql(_templateObject5());
module.exports = {
  PRODUCT_FRAGMENT: PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT: PRODUCT_VARIANT_FRAGMENT,
  PRODUCT_OPTION_FRAGMENT: PRODUCT_OPTION_FRAGMENT,
  PRODUCT_OPTION_VALUE_FRAGMENT: PRODUCT_OPTION_VALUE_FRAGMENT,
  IMAGE_FRAGMENT: IMAGE_FRAGMENT
};