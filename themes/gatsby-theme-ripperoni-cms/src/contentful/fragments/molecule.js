import { graphql } from 'gatsby';


export const ContentfulMoleculeCssFragment = graphql`
  fragment ContentfulMoleculeCss on ContentfulMolecule {
    cms_backgroundColor: backgroundColor {
      backgroundColor: content
    }
    cms_width: width {
      width: content
    }
  }
`;

export const ContentfulMoleculeMarginPaddingsFragment = graphql`
  fragment ContentfulMoleculeMarginPaddings on ContentfulMolecule {
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
  }
`;

export const ContentfulMoleculeDataFragment = graphql`
  fragment ContentfulMoleculeData on ContentfulMolecule {
    component
    ...ContentfulMoleculeCss
    ...ContentfulMoleculeMarginPaddings
    variant
    extraProps {
      internal {
        content
      }
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
    ...ContentfulMeta
  }
`;

export const ContentfulMoleculeFragment = graphql`
  fragment ContentfulMolecule on ContentfulMolecule {
    ...ContentfulMoleculeData
    entries {
      ... on ContentfulAtomButton { ...ContentfulAtomButton }
      ... on ContentfulAtomImage { ...ContentfulAtomImage }
      ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
      ... on ContentfulAtomLink { ...ContentfulAtomLink }
      ... on ContentfulAtomProducts { ...ContentfulAtomProducts }
      ... on ContentfulAtomText { ...ContentfulAtomText }
      ... on ContentfulMolecule {
        ...ContentfulMoleculeData
        entries {
          ... on ContentfulAtomButton { ...ContentfulAtomButton }
          ... on ContentfulAtomImage { ...ContentfulAtomImage }
          ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
          ... on ContentfulAtomLink { ...ContentfulAtomLink }
          ... on ContentfulAtomText { ...ContentfulAtomText }
          ... on ContentfulAtomProducts { ...ContentfulAtomProducts }
          ... on ContentfulMolecule {
            ...ContentfulMoleculeData
            entries {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulAtomProducts { ...ContentfulAtomProducts }
              ... on ContentfulMolecule {
                ...ContentfulMoleculeData
                entries {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                  ... on ContentfulAtomProducts { ...ContentfulAtomProducts }
                  ... on ContentfulMolecule {
                    ...ContentfulMoleculeData
                    entries {
                      ... on ContentfulAtomButton { ...ContentfulAtomButton }
                      ... on ContentfulAtomImage { ...ContentfulAtomImage }
                      ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
                      ... on ContentfulAtomLink { ...ContentfulAtomLink }
                      ... on ContentfulAtomText { ...ContentfulAtomText }
                      ... on ContentfulAtomProducts { ...ContentfulAtomProducts }
                      ... on ContentfulMolecule {
                        ...ContentfulMoleculeData
                        entries {
                          ... on ContentfulAtomButton { ...ContentfulAtomButton }
                          ... on ContentfulAtomImage { ...ContentfulAtomImage }
                          ... on ContentfulAtomVideo { ...ContentfulAtomVideo }
                          ... on ContentfulAtomLink { ...ContentfulAtomLink }
                          ... on ContentfulAtomText { ...ContentfulAtomText }
                          ... on ContentfulAtomProducts { ...ContentfulAtomProducts }
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
