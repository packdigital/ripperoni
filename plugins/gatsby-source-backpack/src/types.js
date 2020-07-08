exports.typeDefs = `
  type BackpackImage implements Node {
    position: Int
    src: String
    altText: String
    localFile: File @link(by: "id", from: "localFile___NODE")
    product: BackpackProduct @link (by: "id", from: "product___NODE")
    variants: [BackpackProductVariant] @link (by: "id", from: "variants___NODE")
  }

  type BackpackVideo implements Node {
    src: String
  }

  type BackpackProductOptionValue implements Node {
    position: Int
    title: String
    productOptionId: String
    option: BackpackProductOption @link(by: "id", from: "option___NODE")
  }

  type BackpackProductOption implements Node {
    position: Int
    title: String
    productId: String
    product: BackpackProduct @link (by: "id", from: "product___NODE")
    values: [BackpackProductOptionValue] @link (by: "id", from: "values___NODE")
  }

  type BackpackProductVariant implements Node {
    available: Boolean
    foreignProductPublishedAt: Date
    metadata: JSON
    selectedOptionsMap: JSON
    inventory: Int
    price: Int
    compareAtPrice: Int
    position: Int
    title: String
    productId: String
    foreignId: String
    productForeignId: String
    foreignProductHandle: String
    sku: String
    product: BackpackProduct @link (by: "id", from: "product___NODE")
    image: BackpackImage @link (by: "id", from: "image___NODE")
    hoverImage: BackpackImage @link(by: "id", from: "hoverImage___NODE")
    images: [BackpackImage] @link (by: "id", from: "images___NODE")
    selectedOptions: [BackpackProductOptionValue] @link(by: "id", from: "selectedOptions___NODE")
  }

  type BackpackProduct implements Node {
    available: Boolean
    metadata: JSON
    optionValues: JSON
    title: String
    handle: String
    description: String
    type: String
    foreignIds: [String]
    featuredImage: BackpackImage @link(by: "id", from: "featuredImage___NODE")
    images: [BackpackImage] @link(by: "id", from: "images___NODE")
    options: [BackpackProductOption] @link (by: "id", from: "options___NODE")
    variants: [BackpackProductVariant] @link(by: "id", from: "variants___NODE")
  }
`;
