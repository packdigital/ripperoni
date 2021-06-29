import { graphql } from 'gatsby';

export const ContentfulAtomImageFragment = graphql`
  fragment ContentfulAtomImage on ContentfulAtomImage {
    primaryImage {
      fluid(maxWidth: 2400) {
        ...GatsbyContentfulFluid_withWebp_noBase64
        __typename
      }
      file {
        contentType
        fileName
        url
        __typename
      }
      __typename
    }
    secondaryImage {
      fluid(maxWidth: 2400) {
        ...GatsbyContentfulFluid_withWebp_noBase64
        __typename
      }
      file {
        contentType
        fileName
        url
        __typename
      }
      __typename
    }
    alt
    primaryImageSizes
    secondaryImageSizes
    objectFit
    objectPosition
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
    __typename
  }
`;
