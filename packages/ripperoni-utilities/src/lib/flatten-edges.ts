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
export function flattenEdges(data: any): any {
  if (data.edges && Array.isArray(data.edges)) {
    return data.edges.map((edge: Edge) => ({ ...edge.node, cursor: edge.cursor }));
  }

  return data;
}

export interface ResponseWithEdges {
  edges: Edge[];
}

export interface Edge {
  node: object;
  cursor: string;
}
