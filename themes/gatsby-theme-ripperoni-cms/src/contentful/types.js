module.exports = `
  union ContentfulAtomsAndMolecule = ContentfulAtomButton | ContentfulAtomVideo | ContentfulAtomImage | ContentfulAtomLink | ContentfulAtomText | ContentfulMolecule


  interface ContentfulJson {
    content: String
  }
  interface ContentfulMarginPadding {
    type: String
    direction: String
    viewport: String
    value: String
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


  type contentfulAtomLinkColorJsonNode implements Node & ContentfulJson @infer {
    content: String
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





  type ContentfulAtomButton implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    text: String
    color: [ContentfulJson] @link(by: "id", from: "color___NODE")
    backgroundColor: [ContentfulJson] @link(by: "id", from: "backgroundColor___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulAtomImage implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    primaryImageSizes: String
    secondaryImageSizes: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulAtomLink implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    color: [ContentfulJson] @link(by: "id", from: "color___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }


  type ContentfulAtomText implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    color: [ContentfulJson] @link(by: "id", from: "color___NODE")
    fontSize: [ContentfulJson] @link(by: "id", from: "fontSize___NODE")
    fontWeight: [ContentfulJson] @link(by: "id", from: "fontWeight___NODE")
    variant: String
    metaTitle: String
    metaHandle: String
    metaTags: [String]
  }

  type ContentfulAtomVideo implements Node & AllContentful @infer {
    id: ID
    contentful_id: String
    type: String
    url: String
    previewUrl: String
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
    extraProps: [contentfulMoleculeExtraPropsJsonNode]
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
