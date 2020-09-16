import { graphql } from 'gatsby';


export const ContentfulPageContainerFragment = graphql`
  fragment ContentfulPageContainer on ContentfulPageContainer {
    slug
    pageContent {
      ... on ContentfulAtomButton { ...ContentfulAtomButton }
      ... on ContentfulAtomImage { ...ContentfulAtomImage }
      ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
      ... on ContentfulAtomLink { ...ContentfulAtomLink }
      ... on ContentfulAtomText { ...ContentfulAtomText }
      ... on ContentfulMolecule { ...ContentfulMolecule }
    }
    ...ContentfulMeta
  }
`;
