# Sequence of Gatsby's bootstrap lifecycle with links to source code as of v2.0.0

### permalink https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/index.js

1. **open and validate gatsby-config** ([get-config-file.js](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/get-config-file.js))

1.5 **load themes** (swyx added this note July 2019)

2. **load plugins** ([load-plugins/index.js](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/load-plugins/index.js)) from the list given in `gatsby-config.js`

3. **onPreBootstrap**: runs `onPreBootstrap` if it is implemented in any plugins, for example [gatsby-plugin-typography](https://github.com/gatsbyjs/gatsby/blob/06e4fccb1abc32ba29e878bb3de303afac390e4a/packages/gatsby-plugin-typography/src/gatsby-node.js). Receives handy [apiCallArgs](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/utils/api-runner-node.js#L72) and pluginOptions.

4. [**delete html and css files from previous builds**](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/index.js#L90) (from the `/public` directory) - a simple delete

5. [delete `/.cache`](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/index.js#L141) if hash of `package.json`, `gatsby-config.js`, `gatsby-node.js`, and `plugin versions` has changed. then [init or reuse `/.cache/cache`](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/utils/cache.js).

6. **copy gatsby files** from the [`cache-dir`](https://github.com/gatsbyjs/gatsby/tree/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/cache-dir) folder in the main gatsby package into your new `/.cache`. Make sure `./cache/json` exists and `./cache/fragments` is empty. If your plugins implement [`gatsby-browser`](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/index.js#L209) and [`gatsby-ssr`](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/index.js#L200), write them out to `.cache/api-runner-browser-plugins.js` and `.cache/api-runner-ssr.js`.

7. **source and transform nodes**: [run `sourceNodes`](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/utils/source-nodes.js) if implemented by plugins (eg [gatsby-source-wikipedia](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby-source-wikipedia/src/gatsby-node.js)), then [garbage collect stale nodes](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/utils/source-nodes.js)
  - [`onCreateNode`](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/redux/plugin-runner.js#L8) runs whenever the [`createNode`](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/redux/actions.js#L452) action is called (which dispatches `CREATE_NODE`)

8. **building schema**: runs [schema/index.js](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/schema/index.js) to build everything involved in the `RootQueryType` GraphQLSchema. a lot of code here i'm skipping over.

9. add extensions: by default gatsby handles `.js` and `.jsx`, but plugins can implement `resolvableExtensions` to add filetypes for other languages, eg [gatsby-plugin-typescript](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby-plugin-typescript/src/gatsby-node.js)

10. **createPages**: run `createPages` hooks implemented by your plugins (e.g. [page-hot-reloader](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/bootstrap/page-hot-reloader.js)) and your `gatsby-node.js`
  - [`onCreatePage`](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/redux/plugin-runner.js#L14) runs whenever the [`createPage`](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/redux/actions.js#L98) action is called (which dispatches `CREATE_PAGE`)

11. **createPagesStatefully**:  "A variant on createPages for plugins that want to have full control over adding/removing pages." more [here](https://www.gatsbyjs.org/docs/node-apis/#createPagesStatefully).

12. **onPreExtractQueries**: runs the `onPreExtractQueries` hook for plugins like [gatsby-transformer-sharp](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby-transformer-sharp/src/gatsby-node.js) and [gatsby-source-contentful](https://github.com/gatsbyjs/gatsby/blob/73523c39bba87869d802d8a3445279e42671efdb/packages/gatsby-source-contentful/src/gatsby-node.js).

13. **update schema**: run schema AGAIN! (why? the comment says "Update Schema for SitePage."). [Report conflicting field types](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/schema/type-conflict-reporter.js).

14. **extract queries from components**: starting from [query-watcher.js](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/internal-plugins/query-runner/query-watcher.js), use [queryCompiler](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/internal-plugins/query-runner/query-compiler.js#L189) to either [replaceComponentQuery](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/redux/reducers/components.js#L22) for pages or [replaceStaticQuery](https://github.com/gatsbyjs/gatsby/blob/1fb19f9ad16618acdac7eda33d295d8ceba7f393/packages/gatsby/src/redux/reducers/static-query-components.js) for [staticQueries](https://www.gatsbyjs.org/blog/2018-06-08-life-after-layouts/).

15. (if not in `NODE_ENV != production`) start the createPages [page-hot-reloader](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/bootstrap/page-hot-reloader.js)

16. **run graphql queries**: [runQueriesForPathnames](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/internal-plugins/query-runner/page-query-runner.js#L100) for pageQueries and staticQueries.

17. **write out page data**: [writePages](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/internal-plugins/query-runner/pages-writer.js)!

18. **write out redirect data**: writes out [browser redirects](https://github.com/gatsbyjs/gatsby/blob/ffd8b2d691c995c760fe380769852bcdb26a2278/packages/gatsby/src/internal-plugins/query-runner/redirects-writer.js) to `.cache/redirects.json`

19. **bootstrap finished - ${process.uptime()}s**: yay

20. **onPostBootstrap**: calls "onPostBootstrap" hook, but no packages seem to implement it.

--
thanks to [sw-yx](https://gist.github.com/sw-yx/09306ec03df7b4cd8e7469bb74c078fb)
