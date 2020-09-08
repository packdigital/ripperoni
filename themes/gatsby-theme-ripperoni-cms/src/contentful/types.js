  // union ContentfulAtoms = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText
  // union AllContentful = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText | ContentfulMolecule | ContentfulPageContainer
module.exports = `
  union ContentfulAtomsAndMolecule = ContentfulAtomButton | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText | ContentfulMolecule


  interface ContentfulJson {
    content: String
  }
  interface ContentfulMarginPadding {
    type: String
    direction: String
    viewport: String
    value: String
  }
  interface ContentfulAtoms {
    width: [ContentfulJson] @link(by: "id", from: "width___NODE")
    marginPadding: [ContentfulMarginPadding] @link(by: "id", from: "marginPadding___NODE")
    variant: String
  }
  interface AllContentful {
    id: ID
    contentful_id: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }





  type contentfulAtomButtonColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomButtonBackgroundColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomButtonWidthJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomButtonMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }

  type contentfulAtomImageWidthJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomImageMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }


  type contentfulAtomLinkColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomLinkWidthJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomLinkMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }


  type contentfulAtomTextColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomTextFontSizeJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomTextFontWeightJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomTextTextAlignJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomTextWidthJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulAtomTextMarginPaddingJsonNode implements Node & ContentfulMarginPadding @infer {
    type: String
    direction: String
    viewport: String
    value: String
  }


  type contentfulMoleculeBackgroundColorJsonNode implements Node & ContentfulJson @infer {
    content: String
  }
  type contentfulMoleculeWidthJsonNode implements Node & ContentfulJson @infer {
    content: String
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
  type contentfulMoleculeExtraPropsJsonNode implements Node & ContentfulJson @infer {
    content: String
  }





  type ContentfulAtomButton implements Node & AllContentful & ContentfulAtoms @infer {
    id: ID
    contentful_id: String
    text: String
    color: [ContentfulJson] @link(by: "id", from: "color___NODE")
    backgroundColor: [ContentfulJson] @link(by: "id", from: "backgroundColor___NODE")
    width: [ContentfulJson] @link(by: "id", from: "width___NODE")
    marginPadding: [ContentfulMarginPadding] @link(by: "id", from: "marginPadding___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulAtomImage implements Node & AllContentful & ContentfulAtoms @infer {
    id: ID
    contentful_id: String
    primaryImageSizes: String
    secondaryImageSizes: String
    objectFit: String
    objectPosition: String
    width: [ContentfulJson] @link(by: "id", from: "width___NODE")
    marginPadding: [ContentfulMarginPadding] @link(by: "id", from: "marginPadding___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulAtomLink implements Node & AllContentful & ContentfulAtoms @infer {
    id: ID
    contentful_id: String
    color: [ContentfulJson] @link(by: "id", from: "color___NODE")
    width: [ContentfulJson] @link(by: "id", from: "width___NODE")
    marginPadding: [ContentfulMarginPadding] @link(by: "id", from: "marginPadding___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulAtomText implements Node & AllContentful & ContentfulAtoms @infer {
    id: ID
    contentful_id: String
    color: [ContentfulJson] @link(by: "id", from: "color___NODE")
    fontSize: [ContentfulJson] @link(by: "id", from: "fontSize___NODE")
    fontWeight: [ContentfulJson] @link(by: "id", from: "fontWeight___NODE")
    textAlign: [ContentfulJson] @link(by: "id", from: "textAlign___NODE")
    width: [ContentfulJson] @link(by: "id", from: "width___NODE")
    marginPadding: [ContentfulMarginPadding] @link(by: "id", from: "marginPadding___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulMolecule implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    backgroundColor: [ContentfulJson] @link(by: "id", from: "backgroundColor___NODE")
    width: [ContentfulJson] @link(by: "id", from: "width___NODE")
    marginPaddingContent: [ContentfulMarginPadding] @link(by: "id", from: "marginPaddingContent___NODE")
    marginPaddingSlots: [ContentfulMarginPadding] @link(by: "id", from: "marginPaddingSlots___NODE")
    entries: [ContentfulAtomsAndMolecule] @link(by: "id", from: "entries___NODE")
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulPageContainer implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    pageContent: [ContentfulAtomsAndMolecule] @link(by: "id", from: "pageContent___NODE")
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }
`;
