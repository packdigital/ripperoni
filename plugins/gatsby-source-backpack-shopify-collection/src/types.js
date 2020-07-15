exports.typeDefs = `
  type BackpackCollectionImage {
    src: String
    altText: String
    localFile: File @link(by: "id", from: "localFile___NODE")
  }

  type BackpackCollectionProduct {
    activeColor: String
    product: BackpackProduct @link
  }

  type BackpackCollection implements Node {
    title: String
    handle: String
    description: String
    optionValues: JSON
    image: BackpackCollectionImage
    products: [BackpackCollectionProduct]
  }
`;
