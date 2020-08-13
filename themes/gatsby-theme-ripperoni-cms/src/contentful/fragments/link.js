import { graphql } from 'gatsby';


export const ContentfulAtomLinkFragment = graphql`
  fragment ContentfulAtomLink on ContentfulAtomLink {
    id
    text
    url
    color
    variant
    contentful_id
    __typename
  }
`;
