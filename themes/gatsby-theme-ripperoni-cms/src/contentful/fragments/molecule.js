import { graphql } from 'gatsby';


export const ContentfulMoleculeDataFragment = graphql`
  fragment ContentfulMoleculeData on ContentfulMolecule {
    id
    contentful_id
    component
    grids {
      grid
      viewport
    }
    marginPadding {
      type
      direction
      value
      viewport
    }
    lookup {
      type
      name
      entry {
        sys {
          id
        }
      }
    }
    __typename
  }
`;

export const ContentfulMoleculeFragment = graphql`
  fragment ContentfulMolecule on ContentfulMolecule {
    ...ContentfulMoleculeData
    entries {
      ... on ContentfulAtomButton { ...ContentfulAtomButton }
      ... on ContentfulAtomImage { ...ContentfulAtomImage }
      ... on ContentfulAtomLink { ...ContentfulAtomLink }
      ... on ContentfulAtomText { ...ContentfulAtomText }
      ... on ContentfulMolecule {
        ...ContentfulMoleculeData
        entries {
          ... on ContentfulAtomButton { ...ContentfulAtomButton }
          ... on ContentfulAtomImage { ...ContentfulAtomImage }
          ... on ContentfulAtomLink { ...ContentfulAtomLink }
          ... on ContentfulAtomText { ...ContentfulAtomText }
          ... on ContentfulMolecule {
            ...ContentfulMoleculeData
            entries {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMolecule {
                ...ContentfulMoleculeData
                entries {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
          }
        }
      }
    }
  }
`;
