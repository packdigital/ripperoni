import { graphql } from 'gatsby';

export const ContentfulAtomProductsFragment = graphql`
  fragment ContentfulAtomProducts on ContentfulAtomProducts {
    cms_variantId: products {
      variantId: content
      __typename
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
    __typename
  }
`;
