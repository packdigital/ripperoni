"use strict";

// Plugin
var PLUGIN_COLOR = 'magenta';
var PLUGIN_NAME = '@packdigital/gatsby-source-backpack';
var PLUGIN_EMOJI = '🎒';
var LOG_PREFIX = PLUGIN_COLOR + " " + PLUGIN_NAME + " " + PLUGIN_EMOJI; // Node prefix

var TYPE_PREFIX = 'Backpack'; // Node types

var PRODUCT = 'Product';
var PRODUCT_VARIANT = 'ProductVariant';
var PRODUCT_OPTION = 'ProductOption';
var PRODUCT_OPTION_VALUE = 'ProductOptionValue';
var IMAGE = 'Image';
module.exports = {
  PLUGIN_NAME: PLUGIN_NAME,
  PLUGIN_COLOR: PLUGIN_COLOR,
  PLUGIN_EMOJI: PLUGIN_EMOJI,
  LOG_PREFIX: LOG_PREFIX,
  TYPE_PREFIX: TYPE_PREFIX,
  PRODUCT: PRODUCT,
  PRODUCT_VARIANT: PRODUCT_VARIANT,
  PRODUCT_OPTION: PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE: PRODUCT_OPTION_VALUE,
  IMAGE: IMAGE
};