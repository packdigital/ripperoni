import { graphql } from 'gatsby';

export const ContentfulAtomTextFragment = graphql`
  fragment ContentfulAtomText on ContentfulAtomText {
    longText: text {
      text
      __typename
    }
    cms_color: color {
      color: content
      __typename
    }
    cms_fontSize: fontSize {
      fontSize: content
      __typename
    }
    cms_fontWeight: fontWeight {
      fontWeight: content
      __typename
    }
    cms_textAlign: textAlign {
      textAlign: content
      __typename
    }
    extraProps {
      internal {
        content
        __typename
      }
      __typename
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
    __typename
  }
`;
