import { graphql } from 'gatsby';


export const ContentfulAtomProductFragment = graphql`
  fragment ContentfulAtomProduct on ContentfulAtomProduct {
    products
    ...ContentfulMeta
  }
`;
