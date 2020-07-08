// Plugin
const PLUGIN_NAME = '@packdigital/gatsby-source-backpack';

// Node prefix
const TYPE_PREFIX = 'Backpack';

// Node types
const PRODUCT = 'Product';
const PRODUCT_VARIANT = 'ProductVariant';
const PRODUCT_OPTION = 'ProductOption';
const PRODUCT_OPTION_VALUE = 'ProductOptionValue';
const IMAGE = 'Image';
const VIDEO = 'Video';


const types = [
  PRODUCT,
  PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE,
  PRODUCT_VARIANT,
  IMAGE,
  VIDEO,
];


module.exports = {
  PLUGIN_NAME,
  TYPE_PREFIX,
  PRODUCT,
  PRODUCT_VARIANT,
  PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE,
  IMAGE,
  VIDEO,
  types,
};
