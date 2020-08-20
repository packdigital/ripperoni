import { graphql } from 'gatsby';


export const ContentfulMoleculeTestDataFragment = graphql`
  fragment ContentfulMoleculeTestData on ContentfulMoleculeTest {
    id
    contentful_id
    component
    gridDesktop
    gridMobile
    lookupContent {
      name
      entries {
        sys {
          id
        }
      }
    }
    lookupSlots {
      name
      entries {
        sys {
          id
        }
      }
    }
    __typename
  }
`;

export const RecursiveContentfulMoleculeTestFragment = graphql`
  fragment RecursiveContentfulMoleculeTest on ContentfulMoleculeTest {
    ...ContentfulMoleculeTestData
    content {
      ... on ContentfulAtomButton { ...ContentfulAtomButton }
      ... on ContentfulAtomImage { ...ContentfulAtomImage }
      ... on ContentfulAtomLink { ...ContentfulAtomLink }
      ... on ContentfulAtomText { ...ContentfulAtomText }
      ... on ContentfulMoleculeTest {
        ...ContentfulMoleculeTestData
        content {
          ... on ContentfulAtomButton { ...ContentfulAtomButton }
          ... on ContentfulAtomImage { ...ContentfulAtomImage }
          ... on ContentfulAtomLink { ...ContentfulAtomLink }
          ... on ContentfulAtomText { ...ContentfulAtomText }
          ... on ContentfulMoleculeTest {
            ...ContentfulMoleculeTestData
            content {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
            slots {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
          }
        }
        slots {
          ... on ContentfulAtomButton { ...ContentfulAtomButton }
          ... on ContentfulAtomImage { ...ContentfulAtomImage }
          ... on ContentfulAtomLink { ...ContentfulAtomLink }
          ... on ContentfulAtomText { ...ContentfulAtomText }
          ... on ContentfulMoleculeTest {
            ...ContentfulMoleculeTestData
            content {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
            slots {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
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
    slots {
      ... on ContentfulAtomButton { ...ContentfulAtomButton }
      ... on ContentfulAtomImage { ...ContentfulAtomImage }
      ... on ContentfulAtomLink { ...ContentfulAtomLink }
      ... on ContentfulAtomText { ...ContentfulAtomText }
      ... on ContentfulMoleculeTest {
        ...ContentfulMoleculeTestData
        content {
          ... on ContentfulAtomButton { ...ContentfulAtomButton }
          ... on ContentfulAtomImage { ...ContentfulAtomImage }
          ... on ContentfulAtomLink { ...ContentfulAtomLink }
          ... on ContentfulAtomText { ...ContentfulAtomText }
          ... on ContentfulMoleculeTest {
            ...ContentfulMoleculeTestData
            content {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
            slots {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
          }
        }
        slots {
          ... on ContentfulAtomButton { ...ContentfulAtomButton }
          ... on ContentfulAtomImage { ...ContentfulAtomImage }
          ... on ContentfulAtomLink { ...ContentfulAtomLink }
          ... on ContentfulAtomText { ...ContentfulAtomText }
          ... on ContentfulMoleculeTest {
            ...ContentfulMoleculeTestData
            content {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
              }
            }
            slots {
              ... on ContentfulAtomButton { ...ContentfulAtomButton }
              ... on ContentfulAtomImage { ...ContentfulAtomImage }
              ... on ContentfulAtomLink { ...ContentfulAtomLink }
              ... on ContentfulAtomText { ...ContentfulAtomText }
              ... on ContentfulMoleculeTest {
                ...ContentfulMoleculeTestData
                content {
                  ... on ContentfulAtomButton { ...ContentfulAtomButton }
                  ... on ContentfulAtomImage { ...ContentfulAtomImage }
                  ... on ContentfulAtomLink { ...ContentfulAtomLink }
                  ... on ContentfulAtomText { ...ContentfulAtomText }
                }
                slots {
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
