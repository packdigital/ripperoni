import { graphql } from 'gatsby';


export const ContentfulAtomImageFragment = graphql`
  fragment ContentfulAtomImage on ContentfulAtomImage {
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
    ...ContentfulMeta
  }
`;
