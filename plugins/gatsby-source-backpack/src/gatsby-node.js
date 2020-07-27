const path = require('path');

const fs = require('fs-extra');


const { isShopifyGid } = require('@packdigital/ripperoni-utilities');

const { typeDefs } = require('./src/types');
const { createClient } = require('./src/client');
const { createContentNodes } = require('./src/nodes');
const { downloadImages } = require('./src/download-images');
const { LOG_PREFIX, PLUGIN_NAME } = require('./src/constants');
const createProductJson = require('./gatsby/node/create-store-json');


exports.createSchemaCustomization = ({ actions: { createTypes }}) => createTypes(typeDefs);

exports.sourceNodes = async (helpers, options) => {
  const { format, panic, activityTimer } = helpers.reporter;
  const { accessToken, shopId, backpackUri } = options;
  const timer = activityTimer(format`{${LOG_PREFIX}}`);

  if (!accessToken) {
    panic(`Please include a Backpack access token to ${PLUGIN_NAME}.`);
  }

  if (!backpackUri) {
    panic(`Please include a Backpack uri to ${PLUGIN_NAME}.`);
  }

  if (!shopId || !isShopifyGid(shopId)) {
    panic(`Please include a Shopify graphql shop id to ${PLUGIN_NAME}.`);
  }

  const client = createClient({ accessToken, backpackUri });

  timer.start();
  timer.setStatus(format`Fetching data and creating nodes`);

  await createContentNodes({ client, shopId, helpers });

  timer.setStatus('Downloading images');

  await downloadImages({ helpers });

  timer.setStatus(format`Sourced {bold Backpack} nodes from {red {bold Backpack}}`);
  timer.end();
};

exports.createPages = async ({ store, graphql, reporter }) => {
  const createStoreJson = createProductJson(store, graphql, reporter);
  // return await Promise.all([
  //   createStoreJson({
  //     template: 'product',
  //     query: ALL_BP_PRODUCTS_QUERY,
  //     previewable: false,
  //     jsonKey: 'handle'
  //   }),
  //   createStoreJson({
  //     template: 'productVariant',
  //     query: ALL_BP_PRODUCTVARIANTS_QUERY,
  //     previewable: false,
  //     jsonKey: 'foreignVariantId'
  //   }),
  // ]);
};

exports.onPreExtractQueries = async ({ store, getNodesByType }) => {
  const program = store.getState().program;


  await fs.copy(
    path.join(__dirname, 'fragments', 'fragments.js'),
    `${program.directory}/.cache/fragments/backpack-fragments.js`,
  );
};

const fullVariant = `
  id
  foreignId
  productId
  productForeignId
  foreignProductHandle
  foreignProductPublishedAt
  available
  inventory
  price
  compareAtPrice
  metadata
  images {
    altText
    position
    src
  }
  product {
    title
    handle
    type
    images {
      src
      position
      altText
    }
  }
`;

const ALL_BP_PRODUCTVARIANTS_QUERY = `
  query  {
    allNodes: allBackpackProductVariant {
      nodes {
        ${fullVariant}
      }
    }
  }
`;

const ALL_BP_PRODUCTS_QUERY = `
  query  {
    allNodes: allBackpackProduct {
      nodes {
        id
        foreignProductIds: foreignIds
        handle
        available
        description
        featuredImage {
          altText
          id
          position
          src
        }
        images {
          altText
          id
          src
          position
        }
        metadata
        optionValues
        options {
          position
          title
          values {
            title
            position
          }
        }
        title
        type
        variants {
          ${fullVariant}
        }
      }
    }
  }
`;