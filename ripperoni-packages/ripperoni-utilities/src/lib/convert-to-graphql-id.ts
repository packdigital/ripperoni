/**
 * Converts an id to the type of id created by gatsby-node-helpers used on Gatsby nodes.
 *
 * @param {string} prefix
 * @param {string} type
 * @param {(string | number)} id
 * @returns {(void | string)}
 */
export function convertToGatsbyGraphQLId(
  id: string | number,
  type: string,
  prefix: string
): null | string | number {
  return !id ? null : !type ? id : `${prefix}__${type}__${id}`;
}
