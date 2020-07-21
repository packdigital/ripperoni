const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { downloadImageAndCreateRemoteFileNode } = require('@packdigital/ripperoni-utilities');

const { LOG_PREFIX, TYPE_PREFIX, IMAGE } = require('./constants');


exports.downloadImages = async ({ helpers }) => {
  const { getNodesByType, reporter } = helpers;
  const { format, success } = reporter;
  const prefixedImage = `${TYPE_PREFIX}${IMAGE}`;

  const downloadedImages = getNodesByType(prefixedImage)
    .map(node =>
      downloadImageAndCreateRemoteFileNode(
        node,
        helpers,
        createRemoteFileNode,
        TYPE_PREFIX
      )
    );

  // eslint-disable-next-line no-undef
  const images = await Promise.all(downloadedImages)
    .then(images => images.filter(image => image));

  const cachedFiles = images.filter(({ type }) => type === 'TOUCH_NODE');
  const downloadedFiles = images.filter(({ __typename }) => __typename === 'Image');

  if (cachedFiles.length > 0) {
    const cachedFilesMessage = format`{${LOG_PREFIX}} Load {bold ${prefixedImage}} files from cache`;
    const cachedFilesResultMessage = format`{bold ${cachedFiles.length} files}`;

    success(`${cachedFilesMessage} - ${cachedFilesResultMessage}`);
  }

  if (downloadedFiles.length > 0) {
    const downloadedFilesMessage = format`{${LOG_PREFIX}} Download {bold ${prefixedImage}} files`;
    const downloadedFilesResultMessage = format`{bold ${downloadedFiles.length} files}`;

    success(`${downloadedFilesMessage} - ${downloadedFilesResultMessage}`);
  }

  return images;
};
