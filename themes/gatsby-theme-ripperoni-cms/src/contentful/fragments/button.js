import { graphql } from 'gatsby';


export const ContentfulAtomButtonFragment = graphql`
  fragment ContentfulAtomButton on ContentfulAtomButton {
    id
    text
    color {
      color: content
    }
    backgroundColor {
      backgroundColor: content
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
