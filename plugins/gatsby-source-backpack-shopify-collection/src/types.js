exports.typeDefs = `
  type BackpackCollectionImage implements Node {
    id: ID!
    src: String!
    altText: String!
    collection: BackpackCollection! @link
    localFile: File @link(by: "id", from: "localFile___NODE")
  }

  type BackpackCollection implements Node @infer {
    id: ID!
    title: String!
    handle: String!
    description: String
    optionValues: JSON
    updatedAt: Date!
    image: BackpackCollectionImage @link
    variants: [BackpackProductVariant] @link
  }
`;
