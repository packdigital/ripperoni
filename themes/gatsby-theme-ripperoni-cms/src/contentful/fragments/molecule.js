import { graphql } from 'gatsby';


export const ContentfulMoleculeFragment = graphql`
  fragment ContentfulMolecule on ContentfulMolecule {
    id
    component
    atoms {
      ... on ContentfulAtomButton {
        ...ContentfulAtomButton
      }
      ... on ContentfulAtomImage {
        ...ContentfulAtomImage
      }
      ... on ContentfulAtomLink {
        ...ContentfulAtomLink
      }
      ... on ContentfulAtomText {
        ...ContentfulAtomText
      }
    }
    __typename
  }
`;
