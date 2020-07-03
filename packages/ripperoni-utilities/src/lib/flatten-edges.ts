/**
 * Flattens response data from graphql api using edges (e.g. shopify).
 *
 * @example
 * ### GraphQL Query Response
 * ```json
 * {
 *   "data": {
 *     "products": {
 *       "edges": [
 *         {
 *           "node": {
 *             "handle": "crew-elongated-white"
 *           }
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 *
 * ```js
 * import { flattenEdges } from '@packdigital/ripperoni-utilities';
 * const flatProducts = flattenEdges(response.data.products);
 * console.log(flatProducts);
 *
 * // [{ "handle": "crew-elongated-white" }, ...]
 * ```
 * @export
 * @param {ResponseWithEdges} data
 * @returns {object[]}
 */
export function flattenEdges(data: ResponseWithEdges): object[] {
  return data.edges.map((edge: Edge) => edge.node);
}

export interface ResponseWithEdges {
  edges: Edge[];
}

export interface Edge {
  node: object;
}
