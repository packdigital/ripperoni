const { downloadImages } = require('./download-images');
const { fetchFreshCollectionData, sortUnchangedRemovedAndStaleNodes } = require('./fetch');
const { touchUnchangedNodes, deleteRemovedNodes, createCollectionNodes, createCollectionImageNodes } = require('./nodes');
const { fetchCollections, parseIncludedCollections, sortCollections, mapCollections } = require('./fetchBulk');


const sourceRecursively = async ({ client, downloadLocal }, { helpers, timer, format }) => {
  timer.setStatus(format`Fetching unchanged, removed, and stale nodes`);
    const {
      unchangedNodes,
      removedNodes,
      staleNodes
    } = await sortUnchangedRemovedAndStaleNodes({ client, helpers });

  if (unchangedNodes.length > 0) {
    timer.setStatus(format`Loading unchanged nodes from cache`);
      touchUnchangedNodes({ unchangedNodes, helpers });
  }

  if (removedNodes.length > 0) {
    timer.setStatus(format`Deleting removed nodes`);
      deleteRemovedNodes({ removedNodes, helpers });
  }

  if (staleNodes.length > 0) {
    timer.setStatus(format`Fetching fresh colleciton data`);
      const collections = await fetchFreshCollectionData({ staleNodes, client, helpers });

    timer.setStatus('Creating collection nodes');
      await createCollectionNodes({ collections, helpers });

    timer.setStatus('Creating collection image nodes');
      await createCollectionImageNodes({ collections, helpers });

    if (downloadLocal === true) {
      timer.setStatus('Downloading images');
        await downloadImages({ helpers });
    }
  }
};

const sourceWithBulkOperation = async ({ client, excludeTerms, downloadLocal }, { helpers, timer, format }) => {

  timer.setStatus(format`Fetching collections with bulk operation`);
    const allCollectionsJsonlStream = await fetchCollections({ client, helpers });

  timer.setStatus(format`Parsing included collections from bulk jsonl stream`);
    const filteredCollections = await parseIncludedCollections({ allCollectionsJsonlStream, excludeTerms, helpers});

  timer.setStatus(format`Fetching unchanged, removed, and stale nodes`);
    const { unchangedNodes, removedNodes, staleNodes, } = await sortCollections({
      filteredCollections,
      helpers
    });

    console.log(`unchangedNodes:${unchangedNodes.length} \n removedNodes:${removedNodes.length} \n staleNodes:${staleNodes.length}`);
  if (unchangedNodes.length > 0) {
    timer.setStatus(format`Loading unchanged nodes from cache`);
      touchUnchangedNodes({ unchangedNodes, helpers });
  }

  if (removedNodes.length > 0) {
    timer.setStatus(format`Deleting removed nodes`);
      deleteRemovedNodes({ removedNodes, helpers });
  }

  if (staleNodes.length > 0) {
    const mappedCollections = await mapCollections({ staleCollections: staleNodes, helpers });

    timer.setStatus('Creating updated collection nodes');
      await createCollectionNodes({ collections: mappedCollections, helpers });

    timer.setStatus('Creating collection image nodes');
      await createCollectionImageNodes({ collections: mappedCollections, helpers });

    if (downloadLocal === true) {
      timer.setStatus('Downloading images');
        await downloadImages({ helpers });
    }
  }
};


module.exports = {
  sourceWithBulkOperation,
  sourceRecursively,
};