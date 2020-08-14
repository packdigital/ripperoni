import { graphql } from 'gatsby';


export const ContentfulMoleculeTestFragment = graphql`
  fragment ContentfulMoleculeTest on ContentfulMoleculeTest {
    id
    contentful_id
    component
    gridDesktop
    gridMobile
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
    id
    contentful_id
    component
    gridDesktop
    gridMobile
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
