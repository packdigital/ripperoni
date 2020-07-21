/**
 * Checks if passed argument is a shopify graphql id
 *
 * @param {string} id
 * @returns {boolean}
 */
export function isShopifyGid(id: string): boolean {
  return id.slice(0, 6) === 'gid://';
}
