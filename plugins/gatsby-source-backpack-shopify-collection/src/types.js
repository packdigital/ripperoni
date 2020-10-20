exports.typeDefs = `
  type BackpackCollectionImage implements Node {
    id: ID!
    src: String!
    altText: String!
    collection: BackpackCollection! @link(by: "id", from: "collection___NODE")
    localFile: File @link(by: "id", from: "localFile___NODE")
  }

  type BackpackCollection implements Node @infer {
    id: ID!
    title: String!
    handle: String!
    description: String
    optionValues: JSON
    updatedAt: Date!
    image: BackpackCollectionImage @link(by: "id", from: "image___NODE")
    variants: [BackpackProductVariant] @link(by: "id", from: "variants___NODE")
  }
`;
