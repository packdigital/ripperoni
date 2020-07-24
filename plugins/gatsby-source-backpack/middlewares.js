"use strict";

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

/* eslint-disable max-lines */
var _require = require('@packdigital/ripperoni-utilities'),
    convertToGatsbyGraphQLId = _require.convertToGatsbyGraphQLId;

var _require2 = require('./constants'),
    TYPE_PREFIX = _require2.TYPE_PREFIX,
    PRODUCT = _require2.PRODUCT,
    PRODUCT_VARIANT = _require2.PRODUCT_VARIANT,
    PRODUCT_OPTION = _require2.PRODUCT_OPTION,
    PRODUCT_OPTION_VALUE = _require2.PRODUCT_OPTION_VALUE,
    IMAGE = _require2.IMAGE;

var byId = function byId(type) {
  return function (_ref) {
    var id = _ref.id;
    return convertToGatsbyGraphQLId(id, type, TYPE_PREFIX);
  };
};

var productMiddleware = function productMiddleware(node) {
  var foreignIds = node.foreignIds.map(byId());
  var metadata = node.metadata === null ? {} : node.metadata;
  var optionValues = node.options.reduce(function (map, _ref2) {
    var _Object$assign;

    var title = _ref2.title,
        values = _ref2.values;
    return Object.assign({}, map, (_Object$assign = {}, _Object$assign[title] = values.map(function (value) {
      return value.title;
    }), _Object$assign));
  }, {});
  var featuredImage___NODE = node.variants[0].images.length ? convertToGatsbyGraphQLId(node.variants[0].images[0].id, IMAGE, TYPE_PREFIX) : node.images.map(byId(IMAGE))[0];
  var images___NODE = node.images.map(byId(IMAGE));
  var options___NODE = node.options.map(byId(PRODUCT_OPTION));
  var variants___NODE = node.variants.map(byId(PRODUCT_VARIANT));
  delete node.featuredImage;
  delete node.options;
  delete node.images;
  delete node.variants;
  return Object.assign({}, node, {
    foreignIds: foreignIds,
    metadata: metadata,
    optionValues: optionValues,
    featuredImage___NODE: featuredImage___NODE,
    options___NODE: options___NODE,
    images___NODE: images___NODE,
    variants___NODE: variants___NODE
  });
};

var productVariantMiddleware = function productVariantMiddleware(node) {
  var firstImage = node.images.find(function (_ref3) {
    var position = _ref3.position;
    return position === 1;
  }) || {};
  var secondImage = node.images.find(function (_ref4) {
    var position = _ref4.position;
    return position === 2;
  }) || {};
  var metadata = node.metadata === null ? {} : node.metadata;
  var selectedOptionsMap = node.selectedOptions.reduce(function (map, _ref5) {
    var _Object$assign2;

    var title = _ref5.title,
        value = _ref5.value;
    return Object.assign({}, map, (_Object$assign2 = {}, _Object$assign2[title] = value, _Object$assign2));
  }, {});
  var product___NODE = convertToGatsbyGraphQLId(node.productId, PRODUCT, TYPE_PREFIX);
  var images___NODE = node.images.map(byId(IMAGE));
  var image___NODE = convertToGatsbyGraphQLId(firstImage.id, IMAGE, TYPE_PREFIX);
  var hoverImage___NODE = convertToGatsbyGraphQLId(secondImage.id, IMAGE, TYPE_PREFIX);
  var selectedOptions___NODE = node.selectedOptions.map(byId(PRODUCT_OPTION_VALUE));
  delete node.product;
  delete node.images;
  delete node.image;
  delete node.hoverImage;
  delete node.selectedOptions;
  return Object.assign({}, node, {
    metadata: metadata,
    selectedOptionsMap: selectedOptionsMap,
    product___NODE: product___NODE,
    images___NODE: images___NODE,
    image___NODE: image___NODE,
    hoverImage___NODE: hoverImage___NODE,
    selectedOptions___NODE: selectedOptions___NODE
  });
};

var productOptionMiddleware = function productOptionMiddleware(node) {
  var product___NODE = convertToGatsbyGraphQLId(node.productId, PRODUCT, TYPE_PREFIX);
  var values___NODE = node.values.map(byId(PRODUCT_OPTION_VALUE));
  delete node.product;
  delete node.values;
  return Object.assign({}, node, {
    product___NODE: product___NODE,
    values___NODE: values___NODE
  });
};

var productOptionValueMiddleware = function productOptionValueMiddleware(node) {
  var option___NODE = convertToGatsbyGraphQLId(node.productOptionId, PRODUCT_OPTION, TYPE_PREFIX);
  delete node.option;
  return Object.assign({}, node, {
    option___NODE: option___NODE
  });
};

var imageMiddleware = function imageMiddleware(node) {
  var id = node.id,
      src = node.src,
      altText = node.altText,
      updatedAt = node.updatedAt,
      parent = node.parent,
      children = node.children,
      internal = node.internal;

  if (node.variants && node.variants.length) {
    var _ref6 = node.variants && node.variants[0],
        firstVariant = _ref6.variant;

    var match = firstVariant.images.find(function (_ref7) {
      var id = _ref7.id;
      return id === node.platformId;
    }) || {};
    var position = match.position || null;
    var product = convertToGatsbyGraphQLId(firstVariant.productId, PRODUCT, TYPE_PREFIX);
    var variants = node.variants.map(function (_ref8) {
      var id = _ref8.id;
      return convertToGatsbyGraphQLId(id, PRODUCT_VARIANT, TYPE_PREFIX);
    });
    return {
      id: id,
      src: src,
      altText: altText,
      position: position,
      updatedAt: updatedAt,
      product___NODE: product,
      variants___NODE: variants,
      parent: parent,
      children: children,
      internal: internal
    };
  }

  if (node.product) {
    return {
      id: id,
      src: src,
      altText: altText,
      updatedAt: updatedAt,
      position: node.product.position || null,
      product___NODE: convertToGatsbyGraphQLId(node.product.id, PRODUCT, TYPE_PREFIX),
      variants___NODE: [],
      parent: parent,
      children: children,
      internal: internal
    };
  }

  return {
    id: id,
    src: src,
    altText: altText,
    updatedAt: updatedAt,
    position: null,
    product___NODE: null,
    variants___NODE: [],
    parent: parent,
    children: children,
    internal: internal
  };
};

module.exports = {
  product: productMiddleware,
  productVariant: productVariantMiddleware,
  productOption: productOptionMiddleware,
  productOptionValue: productOptionValueMiddleware,
  image: imageMiddleware
};