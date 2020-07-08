const typeDefs = `
  type WhateverCollectionImage {
    src: String
    altText: String
    localFile: File @link(by: "id", from: "localFile___NODE")
  }

  type WhateverCollectionProduct {
    activeColor: String
    product: BackpackProduct @link
  }

  type WhateverCollection implements Node {
    title: String
    handle: String
    description: String
    optionValues: JSON
    image: WhateverCollectionImage
    products: [WhateverCollectionProduct]
  }
`;

module.exports = ({ actions: { createTypes }}) => createTypes(typeDefs);
