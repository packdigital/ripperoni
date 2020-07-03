import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { formatMessage, downloadImageAndCreateRemoteFileNode } from '@packdigital/ripperoni-utilities';

import { PLUGIN_NAME, TYPE_PREFIX, IMAGE } from './constants';


export const downloadImages = async helpers => {
  const imageNodes = helpers
    .getNodes()
    .filter(
      node => (
        node.internal.owner === PLUGIN_NAME &&
        node.internal.type === `${TYPE_PREFIX}${IMAGE}`
      )
    );

  const downloadedImages = imageNodes.map(node =>
    downloadImageAndCreateRemoteFileNode(
      node,
      helpers,
      createRemoteFileNode,
      TYPE_PREFIX
    )
  );

  const images = await Promise.all(downloadedImages)
    .then(images => images.filter(image => image));

  const message = `🎒 Downloaded ${images.length} new image files.`;
  const asFormattedMessage = formatMessage(PLUGIN_NAME, 'magenta');

  console.log(asFormattedMessage(message));

  return images;
};
