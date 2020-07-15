exports.typeDefs = `
  type BackpackCollectionImage implements Node {
    id: ID!
    src: String!
    altText: String!
    collection: BackpackCollection!
    localFile: File @link(by: "id", from: "localFile___NODE")
  }

  type BackpackCollection implements Node {
    id: ID!
    title: String!
    handle: String!
    description: String
    optionValues: JSON
    updatedAt: Date!
    image: BackpackCollectionImage
    products: [BackpackProduct]
  }
`;
