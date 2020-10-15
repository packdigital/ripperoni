import { graphql } from 'gatsby';


export const ContentfulAtomTextFragment = graphql`
  fragment ContentfulAtomText on ContentfulAtomText {
    longText: text {
      text
    }
    cms_color: color {
      color: content
    }
    cms_fontSize: fontSize {
      fontSize: content
    }
    cms_fontWeight: fontWeight {
      fontWeight: content
    }
    cms_textAlign: textAlign {
      textAlign: content
    }
    extraProps {
      internal {
        content
      }
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
  }
`;
