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

  union ContentfulMoleculeAtomButtonImageLinkTextUnion = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText | ContentfulMoleculeTest

  type ContentfulMolecule implements Node @infer {
    component: String
    atoms: [ContentfulMoleculeAtomButtonImageLinkTextUnion] @link(by: "id", from: "atoms___NODE")
  }

  type ContentfulMoleculeTest implements Node @infer {
    gridDesktop: String
    gridMobile: String
    content: [ContentfulMoleculeAtomButtonImageLinkTextUnion] @link(by: "id", from: "content___NODE")
    slots: [ContentfulMoleculeAtomButtonImageLinkTextUnion] @link(by: "id", from: "slots___NODE")
  }
`;

// missing
// text - text.text
// image - primaryImage
// image - secondaryImage
