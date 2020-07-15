const { convertToGatsbyGraphQLId } = require('@packdigital/ripperoni-utilities');

const { TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');


const collection = node => {
  const products___NODE = node.products.map(({ id }) => id);
  const image___NODE = node.image
    ? convertToGatsbyGraphQLId(node.image.id, IMAGE, TYPE_PREFIX)
    : null;

  delete node.image;
  delete node.products;

  return {
    ...node,
    image___NODE,
    products___NODE,
  };
};

const image = node => {
  const collection___NODE = convertToGatsbyGraphQLId(node.collectionId, COLLECTION, TYPE_PREFIX);

  delete node.collectionId;

  return {
    ...node,
    collection___NODE,
  };
};

module.exports = {
  collection,
  image,
};
