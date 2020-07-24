"use strict";

exports.typeDefs = "\n  union Backpack = BackpackImage | BackpackVideo | BackpackProductOptionValue | BackpackProductOption | BackpackProductVariant | BackpackProduct\n\n  type BackpackImage implements Node @infer {\n    position: Int\n    src: String\n    altText: String\n    updatedAt: Date!\n    localFile: File @link(by: \"id\", from: \"localFile___NODE\")\n    product: BackpackProduct @link (by: \"id\", from: \"product___NODE\")\n    variants: [BackpackProductVariant] @link (by: \"id\", from: \"variants___NODE\")\n  }\n\n  type BackpackVideo implements Node @infer {\n    src: String\n    updatedAt: Date!\n  }\n\n  type BackpackProductOptionValue implements Node @infer {\n    position: Int\n    title: String\n    productOptionId: String\n    updatedAt: Date!\n    option: BackpackProductOption @link(by: \"id\", from: \"option___NODE\")\n  }\n\n  type BackpackProductOption implements Node @infer {\n    position: Int\n    title: String\n    productId: String\n    updatedAt: Date!\n    product: BackpackProduct @link (by: \"id\", from: \"product___NODE\")\n    values: [BackpackProductOptionValue] @link (by: \"id\", from: \"values___NODE\")\n  }\n\n  type BackpackProductVariant implements Node @infer {\n    available: Boolean\n    foreignProductPublishedAt: Date\n    metadata: JSON\n    selectedOptionsMap: JSON\n    inventory: Int\n    price: Int\n    compareAtPrice: Int\n    position: Int\n    title: String\n    productId: String\n    foreignId: String\n    productForeignId: String\n    foreignProductHandle: String\n    sku: String\n    updatedAt: Date!\n    product: BackpackProduct @link (by: \"id\", from: \"product___NODE\")\n    image: BackpackImage @link (by: \"id\", from: \"image___NODE\")\n    hoverImage: BackpackImage @link(by: \"id\", from: \"hoverImage___NODE\")\n    images: [BackpackImage] @link (by: \"id\", from: \"images___NODE\")\n    selectedOptions: [BackpackProductOptionValue] @link(by: \"id\", from: \"selectedOptions___NODE\")\n  }\n\n  type BackpackProduct implements Node @infer {\n    available: Boolean\n    metadata: JSON\n    optionValues: JSON\n    title: String\n    handle: String\n    description: String\n    type: String\n    foreignIds: [String]\n    updatedAt: Date!\n    featuredImage: BackpackImage @link(by: \"id\", from: \"featuredImage___NODE\")\n    images: [BackpackImage] @link(by: \"id\", from: \"images___NODE\")\n    options: [BackpackProductOption] @link (by: \"id\", from: \"options___NODE\")\n    variants: [BackpackProductVariant] @link(by: \"id\", from: \"variants___NODE\")\n  }\n";