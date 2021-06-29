import { graphql } from 'gatsby';

export const ContentfulMetaFragment = graphql`
  fragment ContentfulMeta on AllContentful {
    id
    contentful_id
    metaTitle
    metaUrl
    metaHandle
    metaTags
    __typename
  }
`;

export const ContentfulCommonAtomFieldsFragment = graphql`
  fragment ContentfulCommonAtomFields on ContentfulAtoms {
    cms_width: width {
      width: content
      __typename
    }
    marginPadding {
      type
      direction
      viewport
      value
      __typename
    }
    variant
    __typename
  }
`;
