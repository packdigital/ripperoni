import { graphql } from 'gatsby';


export const ContentfulAtomTextFragment = graphql`
  fragment ContentfulAtomText on ContentfulAtomText {
    id
    longText: text {
      text
    }
    color {
      color: content
    }
    fontSize {
      fontSize: content
    }
    fontWeight {
      fontWeight: content
    }
    textAlign {
      textAlign: content
    }
    maxWidth {
      maxWidth: content
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
