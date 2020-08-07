module.exports = `
  type ContentfulAtomButton implements Node @infer {
    text: String
    color: String
    backgroundColor: String
    variant: String
  }

  type ContentfulAtomImage implements Node @infer {
    alt: String
    primaryImageSizes: String
    secondaryImageSizes: String
  }

  type ContentfulAtomLink implements Node @infer {
    text: String
    url: String
    color: String
    variant: String
  }

  type ContentfulAtomText implements Node @infer {
    color: String
    variant: String
  }

  union ContentfulAtomButtonImageLinkTextUnion = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText

  type ContentfulMolecule implements Node @infer {
    component: String
    atoms: [ContentfulAtomButtonImageLinkTextUnion] @link(by: "id", from: "atoms___NODE")
  }
`;

// missing
// text - text.text
// image - primaryImage
// image - secondaryImage
