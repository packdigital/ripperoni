import { graphql } from 'gatsby';


export const ContentfulAtomButtonFragment = graphql`
  fragment ContentfulAtomButton on ContentfulAtomButton {
    id
    text
    color
    backgroundColor
    variant
    __typename
  }
`;
