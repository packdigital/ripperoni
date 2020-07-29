// const path = require('path');
// const fs = require('fs-extra');
// const btoa = require('btoa');
// export const createProductJson = (store, graphql, reporter) => async ({ template, query, previewable = true, jsonKey }) => {
//   const program = store.getState().program;
//   if (process.env.PREVIEW == 'true' && !previewable) return;
//   const { data, errors } = await graphql(query);
//   if (errors) return reporter.panic('error loading createPages data', errors);
//   // write product json files
//   data.allNodes.nodes.forEach(async node => {
//     let fileName = node[jsonKey];
//     // Here we can run some 'transformations' we did in the frontend!!
//     if (template === 'product') {
//       // set first available a selectedVariant (one less step in the front)
//       node.selectedVariant = node.variants.find(({ available }) => available);
//     }
//     if (template === 'productVariant') {
//       if (jsonKey === 'foreignId') {
//         // convert:
//         // from: gid://shopify/ProductVariant/33608556281995
//         // to: Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzYwODU1NjI4MTk5NQ==
//         fileName = btoa(fileName);
//       }
//     }
//     const pathName = `${program.directory}/static/${template}/${jsonKey}`;
//     const fileNamePath = `${pathName}/${fileName}.js`;
//     // Create the directory for the static data
//     try {
//       await fs.mkdirp(pathName);
//     } catch (error) {
//       return reporter.panic('error creating JSON static folder:', error);
//     }
//     // Save static product json file
//     try {
//       await fs.writeFile(
//         fileNamePath,
//         'export default' + JSON.stringify(node)
//       );
//     } catch (error) {
//       return reporter.panic('error writing product JSON', error);
//     }
//   });
// };
"use strict";