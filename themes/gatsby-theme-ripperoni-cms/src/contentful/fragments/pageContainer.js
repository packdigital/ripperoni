import { graphql } from 'gatsby';


export const ContentfulPageContainerFragment = graphql`
  fragment ContentfulPageContainer on ContentfulPageContainer {
    id
    slug
    content {
      ... on ContentfulAtomButton { ...ContentfulAtomButton }
      ... on ContentfulAtomImage { ...ContentfulAtomImage }
      ... on ContentfulAtomLink { ...ContentfulAtomLink }
      ... on ContentfulAtomText { ...ContentfulAtomText }
      ... on ContentfulMolecule { ...ContentfulMolecule }
    }
    # metaTitle
    # metaHandle
    # metaTags
    __typename
  }
`;
