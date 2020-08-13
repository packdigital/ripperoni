module.exports = `
  type ContentfulAtomButton implements Node @infer {
    text: String
    color: String
    backgroundColor: String
    variant: String
    contentful_id: String
  }

  type ContentfulAtomImage implements Node @infer {
    alt: String
    primaryImageSizes: String
    secondaryImageSizes: String
    contentful_id: String
  }

  type ContentfulAtomLink implements Node @infer {
    text: String
    url: String
    color: String
    variant: String
    contentful_id: String
  }

  type ContentfulAtomText implements Node @infer {
    color: String
    variant: String
    contentful_id: String
  }

  union ContentfulAtomButtonImageLinkTextUnion = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText

  type ContentfulMolecule implements Node @infer {
    component: String
    atoms: [ContentfulAtomButtonImageLinkTextUnion] @link(by: "id", from: "atoms___NODE")
  }

  type ContentfulMoleculeTest implements Node @infer {
    component: String
    layout: String
    content: [ContentfulAtomButtonImageLinkTextUnion] @link(by: "id", from: "content___NODE")
    slots: [ContentfulAtomButtonImageLinkTextUnion] @link(by: "id", from: "slots___NODE")
    atoms: [ContentfulAtomButtonImageLinkTextUnion] @link(by: "id", from: "atoms___NODE")
  }
`;

// missing
// text - text.text
// image - primaryImage
// image - secondaryImage
