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
const TYPES = [PRODUCT, PRODUCT_VARIANT, PRODUCT_OPTION, PRODUCT_OPTION_VALUE, IMAGE];
module.exports = {
  IMAGE,
  LOG_PREFIX,
  PLUGIN_COLOR,
  PLUGIN_EMOJI,
  PLUGIN_NAME,
  PRODUCT_OPTION_VALUE,
  PRODUCT_OPTION,
  PRODUCT_VARIANT,
  PRODUCT,
  TYPE_PREFIX,
  TYPES
};