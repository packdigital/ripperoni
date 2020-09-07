import { graphql } from 'gatsby';


export const ContentfulMetaFragment = graphql`
  fragment ContentfulMeta on AllContentful {
    id
    contentful_id
    # metaTitle
    # metaHandle
    # metaTags
    __typename
  }
`;

export const ContentfulCommonAtomFieldsFragment = graphql`
  fragment ContentfulCommonAtomFields on ContentfulAtoms {
    marginPadding {
      type
      direction
      viewport
      value
    }
    variant
  }
`;
