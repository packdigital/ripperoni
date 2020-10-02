/* eslint-disable max-lines */
const querystring = require('querystring');

const _pick = require('lodash.pick');


exports._fieldResolvers = ({ bpVariant, feedOptions }) => ({
  id: ({ key, type }) => {
    if (key !== 'id') return `Invalid key ${key} for id`;
    const validType = ['legacyVariantId', 'variantGid', 'bpVariantId'].includes(type);
    if (!validType) return `Invalid type ${type} for ${key}`;

    switch (type) {
      case 'legacyVariantId' : {
        return getLegacyResourceId(bpVariant.foreignId);
      }

      case 'variantGid' : {
        return bpVariant.foreignId;
      }

      case 'bpVariantId' : {
        return bpVariant.id;
      }

      default: getLegacyResourceId(bpVariant.foreignId);
    }
  },

  title: ({ key, type, values }) => {
    if (key !== 'title') return null;
    const validType = ['seoTitle', 'productTitle', 'dynamicTitle'].includes(type);
    if (!validType) return `Invalid type ${type} for ${key}`;

    const defaultTitle = bpVariant.metadata.seoTitle;

    switch (type) {
      case 'seoTitle': {
        return defaultTitle;
      }
      case 'productTitle': {
        return bpVariant.product.title;
      }
      case 'dynamicTitle': {
        // if no optionKeys passed as values we return seoTitle
        if (!values || !values.length) {
          return defaultTitle;
        }

        // if Size, Color, Cut => "Large Blue Crew"
        return values.
          map(selectedOptionKey => bpVariant[selectedOptionKey]).join(' ');
      }

      default: defaultTitle;
    }
  },

  description: ({ key, type }) => {
    if (key !== 'description') return `Invalid key ${key} for description`;
    const validType = ['seoDescription', 'productDescription'].includes(type);
    if (!validType) return `Invalid type ${type} for ${key}`;

    const defaultDescription = bpVariant.metadata.seoDescription;

    switch (type) {
      case 'seoDescription' : {
        return defaultDescription;
      }

      case 'productDescription' : {
        return bpVariant.product.description;
      }

      default: defaultDescription;
    }
  },

  product_type: ({ key }) => {
    if (key !== 'product_type') return `Invalid key ${key} for product_type`;;

    const defaultProductType = bpVariant.product.type;

    return defaultProductType;
  },

  link: ({ key, type, values }) => {
    if (key !== 'link') return null;
    const validType = ['backpackUrl', 'shopifyUrl'].includes(type);
    if (!validType) return null;

    const { publicUrl } = feedOptions;

    switch (type) {
      case 'backpackUrl' : {
         if (!values) {
          const legacyVariantId = getLegacyResourceId(bpVariant.foreignId);
          const backpackUrl = `${publicUrl}/products/${bpVariant.product.handle}?variant=${legacyVariantId}` || '';
          return backpackUrl
        }

        const queryOptions = _pick(bpVariant.selectedOptionsMap, values);
        const queryOptionsCount = Object.keys(queryOptions).length;
        let queryString = querystring.stringify(queryOptions);

        // we hard coding productTypeHandle/productHandle?options... for now
        const backpackUrl = `${publicUrl}/products/${bpVariant.product.handle}${queryOptionsCount ? '?'+queryString : ''}` || '';

        return backpackUrl;
      }

      case 'shopifyUrl': {
        const legacyVariantId = getLegacyResourceId(bpVariant.foreignId);
        const shopifyUrl = `${publicUrl}/products/${bpVariant.foreignProductHandle}?variant=${legacyVariantId}` || '';
        return shopifyUrl;
      }

      default: '';
    }
  },

  image_link: ({ key, type }) => {
    if (key !== 'image_link') return null;
    const validType = ['variantsFirst', 'productsFirst'].includes(type);
    if (!validType) return null;

    const variantsFirstOrProductsFirstImage =  (bpVariant.images && bpVariant.images.length)
      ? bpVariant.images[0].src
      : bpVariant.image && bpVariant.image.src
        ? bpVariant.image.src
        : ''

    return variantsFirstOrProductsFirstImage;
  },

  brand: ({ key, type, values: value }) => {
    if (key !== 'brand') return `Invalid key ${key} for brand`;
    const validType = ['vendor', 'custom'].includes(type);
    if (!validType) return `Invalid type ${type} for ${key}`;

    const defaultBrand = ( bpVariant.product && bpVariant.product.vendor )
      ? bpVariant.product.vendor
      : '';

    switch (type) {
      case 'vendor' : {
        return defaultBrand;
      }

      case 'custom' : {
        return value;
      }

      default: defaultBrand;
    }
  },

  options: ({ key, values }) => {
    if (key !== 'options') return `Invalid key ${key} for options`;
    if (!values || !values.length) return `Missing key ${key} values / selectedOptionKeys`;

    return values.reduce((options, optionKey) => {
      options[optionKey.toLowerCase()] = bpVariant.selectedOptionsMap[optionKey];
      return options;
    }, {});
  },

  metadata: ({ key, values }) => {
    if (key !== 'metadata') return `Invalid key ${key} for metadata`;
    if (!values || !values.length) return `Missing key ${key} values / selectedOptionKeys`;

    return values.reduce((metadata, optionKey) => {
      metadata[optionKey.toLowerCase()] = bpVariant.metadata[optionKey];
      return metadata;
    }, {});
  },

  condition: ({ key, values: value }) => {
    if (key !== 'condition') return `Invalid key ${key} for condition`;

    const defaultCondition = 'new';

    if (!value || value === '' ) return defaultCondition;

    return value;
  },

  availability: ({ key, values }) => {
    if (key !== 'availability') return `Invalid key ${key} for availability`;

    const defaultAvailability = bpVariant.available
      ? 'in stock'
      : 'out of stock';

    if (!values || values.length === 0 ) return defaultAvailability;

    return bpVariant.available
      ? values[0]
      : values[1];
  },

  price: ({ key, type, values: value }) => {
    if (key !== 'price') return `Invalid key ${key} for price`;
    const validType = ['noCurrencyCode', 'withCurrencyCode-after', 'withCurrencyCode-before'].includes(type);
    if (!validType) return `Invalid type ${type} for ${key}`;

    const defaultPrice = (bpVariant.price / 100)
      .toString()
      .replace('.00', '');

    switch (type) {
      case 'noCurrencyCode' : {
        return defaultPrice;
      }

      case 'withCurrencyCode-before' : {
        if (!value || value === '') {
          return defaultPrice;
        }
        return `${value} ${defaultPrice}`;
      }

      case 'withCurrencyCode-after' : {
        if (!value || value === '') {
          return defaultPrice;
        }
        return `${defaultPrice} ${value} `;
      }

      default: defaultPrice;
    }
  },

  gtin: ({ key, type }) => {
    if (key !== 'gtin') return `Invalid key ${key} for gtin`;
    const validType = ['barcode', 'sku'].includes(type);
    if (!validType) return `Invalid type ${type} for ${key}`;

    const defaultGtin = bpVariant.barcode
      ? bpVariant.barcode
      : bpVariant.sku
        ? bpVariant.sku
        : '';

    switch (type) {
      case 'barcode' : {
        return defaultGtin;
      }

      case 'sku' : {
        return bpVariant.sku
          ? bpVariant.sku
          : '';
      }

      default: defaultGtin;
    }
  },

  shipping_weight: ({ key, type }) => {
    // shipping_weight: `${shopVariant.weight} ${shopVariant.weightUnit === 'POUNDS' ? 'lb' : shopVariant.weightUnit || ''}`,
    return null;
  },

  item_group_id: ({ key, type, }) => {
    if (key !== 'item_group_id') return `Invalid key ${key} for item_group_id`;


    const defaultItemGroupId = getLegacyResourceId(bpVariant.productForeignId);

    switch (type) {
      case 'legacyProductId' : {
        return defaultItemGroupId;
      }

      case 'productGid' : {
        return bpVariant.productForeignId;
      }

      case 'bpProductId' : {
        return bpVariant.product.id;
      }

      default: defaultItemGroupId;
    }
  },

});

const getLegacyResourceId = gId => {
  const shopifyId = gId.split('/').pop();
  return shopifyId;
};