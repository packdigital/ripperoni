import { graphql } from 'gatsby';


export const ContentfulAtomVideoFragment = graphql`
  fragment ContentfulAtomVideo on ContentfulAtomVideo {
    type
    url
    previewUrl
    ...ContentfulMeta
  }
`;
