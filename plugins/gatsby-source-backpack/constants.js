"use strict";

// Plugin
const PLUGIN_COLOR = 'magenta';
const PLUGIN_NAME = '@packdigital/gatsby-source-backpack';
const PLUGIN_EMOJI = '🎒';
const LOG_PREFIX = `${PLUGIN_COLOR} ${PLUGIN_NAME} ${PLUGIN_EMOJI}`; // Node prefix

const TYPE_PREFIX = 'Backpack'; // Node types

const PRODUCT = 'Product';
const PRODUCT_VARIANT = 'ProductVariant';
const PRODUCT_OPTION = 'ProductOption';
const PRODUCT_OPTION_VALUE = 'ProductOptionValue';
const IMAGE = 'Image';
module.exports = {
  PLUGIN_NAME,
  PLUGIN_COLOR,
  PLUGIN_EMOJI,
  LOG_PREFIX,
  TYPE_PREFIX,
  PRODUCT,
  PRODUCT_VARIANT,
  PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE,
  IMAGE
};