import { graphql } from 'gatsby';

export const ContentfulPageContainerFragment = graphql`
  fragment ContentfulPageContainer on ContentfulPageContainer {
    slug
    pageContent {
      ... on ContentfulAtomButton {
        ...ContentfulAtomButton
        __typename
      }
      ... on ContentfulAtomImage {
        ...ContentfulAtomImage
        __typename
      }
      ... on ContentfulAtomVideo {
        ...ContentfulAtomVideo
        __typename
      }
      ... on ContentfulAtomLink {
        ...ContentfulAtomLink
        __typename
      }
      ... on ContentfulAtomText {
        ...ContentfulAtomText
        __typename
      }
      ... on ContentfulMolecule {
        ...ContentfulMolecule
        __typename
      }
      __typename
    }
    ...ContentfulMeta
    __typename
  }
`;
