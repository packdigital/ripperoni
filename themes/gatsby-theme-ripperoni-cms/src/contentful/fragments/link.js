import { graphql } from 'gatsby';


export const ContentfulAtomLinkFragment = graphql`
  fragment ContentfulAtomLink on ContentfulAtomLink {
    id
    text
    url
    color {
      color: content
    }
    marginPadding {
      type
      direction
      viewport
      value
    }
    variant
    # metaTitle
    # metaHandle
    # metaTags
    contentful_id
    __typename
  }
`;
