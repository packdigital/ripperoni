import { graphql } from 'gatsby';


export const ContentfulAtomImageFragment = graphql`
  fragment ContentfulAtomImage on ContentfulAtomImage {
    id
    primaryImage {
      fluid (maxWidth: 2400) {
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
    }
    secondaryImage {
      fluid (maxWidth: 2400) {
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
    }
    alt
    primaryImageSizes
    secondaryImageSizes
    # metaTitle
    # metaHandle
    # metaTags
    contentful_id
    __typename
  }
`;
