import { graphql } from 'gatsby';


export const ContentfulAtomTextFragment = graphql`
  fragment ContentfulAtomText on ContentfulAtomText {
    id
    longText: text {
      text
    }
    color
    variant
    contentful_id
    __typename
  }
`;
