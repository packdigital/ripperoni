import { graphql } from 'gatsby';

export const ContentfulAtomLinkFragment = graphql`
  fragment ContentfulAtomLink on ContentfulAtomLink {
    text
    url
    newWindow
    cms_color: color {
      color: content
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
  }
`;
