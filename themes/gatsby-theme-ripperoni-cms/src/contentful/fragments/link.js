import { graphql } from 'gatsby';

export const ContentfulAtomLinkFragment = graphql`
  fragment ContentfulAtomLink on ContentfulAtomLink {
    text
    url
    tagAttributes
    newWindow
    cms_color: color {
      color: content
      __typename
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
    __typename
  }
`;
