import { graphql } from 'gatsby';

export const ContentfulAtomImageFragment = graphql`
  fragment ContentfulAtomImage on ContentfulAtomImage {
    primaryImage {
      fluid(maxWidth: 2400) {
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
      file {
        contentType
        fileName
        url
      }
    }
    secondaryImage {
      fluid(maxWidth: 2400) {
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
      file {
        contentType
        fileName
        url
      }
    }
    alt
    primaryImageSizes
    secondaryImageSizes
    objectFit
    objectPosition
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
  }
`;
