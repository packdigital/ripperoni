import { graphql } from 'gatsby';


export const ContentfulAtomButtonFragment = graphql`
  fragment ContentfulAtomButton on ContentfulAtomButton {
    text
    cms_color: color {
      color: content
    }
    cms_backgroundColor: backgroundColor {
      backgroundColor: content
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
  }
`;
