/* tslint:disable:no-console */
import { ImageNodeInput, ImageNodePluginArgs, RemoteFileNode } from '../types/gatsby';
import { formatMessage } from './format-message';

/**
 * Downloads an image and creates a remote file node in Gatsby's data layer.
 *
 * @export
 * @param {NodeInput} node
 * @param {NodePluginArgs} helpers
 * @param {string} prefix
 * @returns {Promise<NodeInput>}
 */
export async function downloadImageAndCreateRemoteFileNode(
  node: ImageNodeInput,
  helpers: ImageNodePluginArgs,
  createRemoteFileNode: (args: object) => Promise<RemoteFileNode>,
  prefix: string
): Promise<ImageNodeInput | void> {
  try {
    const {
      actions: { createNode, touchNode },
      createNodeId,
      store,
      cache,
      reporter,
    } = helpers;

    const imageDataCacheKey = `${prefix}__IMAGE__${node.src}`;
    const cachedRemoteData = await cache.get(imageDataCacheKey);
    const createAndCacheRemoteFileNode = async () => {
      const fileNode = await createRemoteFileNode({
        cache,
        createNode,
        createNodeId,
        parentNodeId: node.id,
        reporter,
        store,
        url: node.src,
      });

      const { fileNodeID } = await cache.set(imageDataCacheKey, { fileNodeID: fileNode.id });

      // tslint:disable-next-line: no-expression-statement
      node.localFile___NODE = fileNodeID;

      return node;
    };

    return cachedRemoteData
      ? touchNode({ nodeId: cachedRemoteData.fileNodeID })
      : await createAndCacheRemoteFileNode();
  } catch (error) {

    const message = `Error downloading image and creating remote file node: ${error}`;
    const asFormattedMessage = formatMessage();

    console.log(asFormattedMessage(message, 'red'));
    console.log(`node:\n${node}`);

    return;
  }
}
