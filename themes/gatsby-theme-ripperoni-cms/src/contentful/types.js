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

  type ContentfulPageContainer implements Node @infer {
    pageTitle: String
    variant: String
  }

  union ContentfulMoleculeAtomButtonImageLinkTextUnion = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText | ContentfulMolecule

  type contentfulMoleculeMarginPaddingJsonNode implements Node @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type ContentfulMolecule implements Node @infer {
    marginPadding: [contentfulMoleculeMarginPaddingJsonNode]  @link(by: "id", from: "marginPadding___NODE")
    entries: [ContentfulMoleculeAtomButtonImageLinkTextUnion] @link(by: "id", from: "entries___NODE")
  }
`;


// missing
// text - text.text
// image - primaryImage
// image - secondaryImage
