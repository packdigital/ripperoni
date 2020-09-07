module.exports = `
  union ContentfulMoleculeAtomButtonImageLinkTextUnion = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText | ContentfulMolecule
  union ContentfulPageContainerMoleculeAtomButtonImageLinkTextUnion = ContentfulMolecule | ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText

  interface ContentfulJson {
    content: String
  }

  interface ContentfulMarginPadding {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulAtomButtonColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomLinkColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomTextColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomButtonBackgroundColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulMoleculeBackgroundColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomTextFontSizeJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomTextFontWeightJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomTextMaxWidthJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomTextTextAlignJsonNode implements Node & ContentfulJson @infer {
    content: String
  }

  type contentfulAtomButtonMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulAtomLinkMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulMoleculeMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulAtomTextMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulMoleculeMarginPaddingContentJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulMoleculeMarginPaddingSlotsJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }





  type ContentfulAtomButton implements Node @infer {
    text: String
    color: [ContentfulJson]  @link(by: "id", from: "color___NODE")
    backgroundColor: [ContentfulJson]  @link(by: "id", from: "backgroundColor___NODE")
    marginPadding: [ContentfulMarginPadding]  @link(by: "id", from: "marginPadding___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
    contentful_id: String
  }

  type ContentfulAtomImage implements Node @infer {
    alt: String
    primaryImageSizes: String
    secondaryImageSizes: String
    objectFit: String
    objectPosition: String
    contentful_id: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }

  type ContentfulAtomLink implements Node @infer {
    text: String
    url: String
    color: [ContentfulJson]  @link(by: "id", from: "color___NODE")
    marginPadding: [ContentfulMarginPadding]  @link(by: "id", from: "marginPadding___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
    contentful_id: String
  }

  type ContentfulMolecule implements Node @infer {
    backgroundColor: [ContentfulJson]  @link(by: "id", from: "backgroundColor___NODE")
    marginPadding: [contentfulMoleculeMarginPaddingJsonNode]  @link(by: "id", from: "marginPadding___NODE")
    entries: [ContentfulMoleculeAtomButtonImageLinkTextUnion] @link(by: "id", from: "entries___NODE")
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }

  type ContentfulPageContainer implements Node @infer {
    slug: String
    content: [ContentfulPageContainerMoleculeAtomButtonImageLinkTextUnion]  @link(by: "id", from: "content___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }

  type ContentfulAtomText implements Node @infer {
    color: [ContentfulJson]  @link(by: "id", from: "color___NODE")
    fontSize: [ContentfulJson]  @link(by: "id", from: "fontSize___NODE")
    fontWeight: [ContentfulJson]  @link(by: "id", from: "fontWeight___NODE")
    maxWidth: [ContentfulJson]  @link(by: "id", from: "maxWidth___NODE")
    marginPadding: [ContentfulMarginPadding]  @link(by: "id", from: "marginPadding___NODE")
    marginPaddingContent: [ContentfulMarginPadding]  @link(by: "id", from: "marginPadding___NODE")
    marginPaddingSlots: [ContentfulMarginPadding]  @link(by: "id", from: "marginPadding___NODE")
    textAlign: [ContentfulJson]  @link(by: "id", from: "textAlign___NODE")
    variant: String
    contentful_id: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }
`;
