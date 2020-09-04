import { graphql } from 'gatsby';


export const ContentfulMoleculeDataFragment = graphql`
  fragment ContentfulMoleculeData on ContentfulMolecule {
    id
    contentful_id
    component
    backgroundColor {
      backgroundColor: content
    }
    marginPaddingContent {
      type
      direction
      value
      viewport
    }
    marginPaddingSlots {
      type
      direction
      value
      viewport
    }
    grids {
      grid
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
        }
      }
    }
  }
`;
