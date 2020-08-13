import { graphql } from 'gatsby';


export const ContentfulMoleculeFragment = graphql`
  fragment ContentfulMolecule on ContentfulMolecule {
    id
    component
    layout
    layoutMobile
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
    lookup {
      name
      value {
        sys {
          id
        }
      }
    }
    __typename
  }
`;

export const ContentfulMoleculeTestFragment = graphql`
  fragment ContentfulMoleculeTest on ContentfulMoleculeTest {
    id
    contentful_id
    component
    layout
    layoutMobile
    content {
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
      __typename
    }
    slots {
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
      __typename
    }
    lookup {
      content {
        name
        value {
          sys {
            id
          }
        }
      }
      slots {
        name
        value {
          sys {
            id
          }
        }
      }
    }
    __typename
  }
`;

export const RecursiveContentfulMoleculeTestFragment = graphql`
  fragment RecursiveContentfulMoleculeTest on ContentfulMoleculeTest {
    id
    contentful_id
    component
    layout
    layoutMobile
    content {
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
      ... on ContentfulMoleculeTest {
        ...ContentfulMoleculeTest
      }
      __typename
    }
    slots {
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
      ... on ContentfulMoleculeTest {
        ...ContentfulMoleculeTest
      }
      __typename
    }
    lookup {
      content {
        name
        value {
          sys {
            id
          }
        }
      }
      slots {
        name
        value {
          sys {
            id
          }
        }
      }
    }
    __typename
  }
`;
