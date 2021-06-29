import { graphql } from 'gatsby';

export const ContentfulMoleculeCssFragment = graphql`
  fragment ContentfulMoleculeCss on ContentfulMolecule {
    cms_backgroundColor: backgroundColor {
      backgroundColor: content
      __typename
    }
    cms_width: width {
      width: content
      __typename
    }
    __typename
  }
`;

export const ContentfulMoleculeMarginPaddingsFragment = graphql`
  fragment ContentfulMoleculeMarginPaddings on ContentfulMolecule {
    marginPaddingContent {
      type
      direction
      value
      viewport
      __typename
    }
    marginPaddingSlots {
      type
      direction
      value
      viewport
      __typename
    }
    __typename
  }
`;

export const ContentfulMoleculeDataFragment = graphql`
  fragment ContentfulMoleculeData on ContentfulMolecule {
    component
    ...ContentfulMoleculeCss
    ...ContentfulMoleculeMarginPaddings
    __typename
    variant
    extraProps {
      internal {
        content
        __typename
      }
      __typename
    }
    grids {
      grid
      viewport
      __typename
    }
    lookup {
      type
      name
      entry {
        sys {
          id
          __typename
        }
        __typename
      }
      __typename
    }
    ...ContentfulMeta
    __typename
  }
`;

export const ContentfulMoleculeFragment = graphql`
  fragment ContentfulMolecule on ContentfulMolecule {
    ...ContentfulMoleculeData
    __typename
    entries {
      __typename
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
      ... on ContentfulAtomProducts {
        ...ContentfulAtomProducts
        __typename
      }
      ... on ContentfulAtomText {
        ...ContentfulAtomText
        __typename
      }
      ... on ContentfulMolecule {
        ...ContentfulMoleculeData
        __typename
        entries {
          __typename
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
          ... on ContentfulAtomProducts {
            ...ContentfulAtomProducts
            __typename
          }
          ... on ContentfulMolecule {
            ...ContentfulMoleculeData
            __typename
            entries {
              __typename
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
              ... on ContentfulAtomProducts {
                ...ContentfulAtomProducts
                __typename
              }
              ... on ContentfulMolecule {
                ...ContentfulMoleculeData
                __typename
                entries {
                  __typename
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
                  ... on ContentfulAtomProducts {
                    ...ContentfulAtomProducts
                    __typename
                  }
                  ... on ContentfulMolecule {
                    ...ContentfulMoleculeData
                    __typename
                    entries {
                      __typename
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
                      ... on ContentfulAtomProducts {
                        ...ContentfulAtomProducts
                        __typename
                      }
                      ... on ContentfulMolecule {
                        ...ContentfulMoleculeData
                        __typename
                        entries {
                          __typename
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
                          ... on ContentfulAtomProducts {
                            ...ContentfulAtomProducts
                            __typename
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
  }
`;
