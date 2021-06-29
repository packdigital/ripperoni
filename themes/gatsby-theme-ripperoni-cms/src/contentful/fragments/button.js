import { graphql } from 'gatsby';

export const ContentfulAtomButtonFragment = graphql`
  fragment ContentfulAtomButton on ContentfulAtomButton {
    text
    cms_color: color {
      color: content
      __typename
    }
    cms_backgroundColor: backgroundColor {
      backgroundColor: content
      __typename
    }
    ...ContentfulCommonAtomFields
    ...ContentfulMeta
    __typename
  }
`;
