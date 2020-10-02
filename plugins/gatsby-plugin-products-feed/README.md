# gatsby-plugin-products-feed

## Default plugin options:
```
{
  storefrontAccessToken: null,
    shopifyDomain: null,
    publicUrl: null,
    feedEndpoint: 'products-feed',
    collectionHandle: 'frontpage',
    exludeSoldout: true,
    feedItem: [
      { key: 'id', type: 'legacyVariantId' }
      { key: 'title', type: 'seoTitle'},
      { key: 'description', type: 'seoDescription' },
      { key: 'product_type' },
      { key: 'link', type: 'shopifyUrl' },
      { key: 'image_link' },
      { key: 'brand', type: 'vendor' },
      { key: 'condition' },
      { key: 'availability' },
      { key: 'price', type: 'noCurrencyCode' },
      { key: 'gtin', type: 'barcode' }
      { key: 'item_group_id', type: 'legacyProductId' }
    ],
}
```
---

## Plugin options:

#### shopifyDomain (string)
i.e: "public-rec-headless.myshopify.com"

#### publicUrl (string)
Public url without a trailing slash
i.e: "https://www.publicrec.com"

#### collectionHandle (String)
The collection's handle used to build the feed from. Defaults to "frontpage". shopify default.
i.e: "shop-all"

#### exludeSoldout (bool)
Wether to exclude soldout variants from the feed. true|false

---

#### feedItem (Array)
Fields and options for each product feed item:

##### id
 type: ```'legacyVariantId'``` or ```'variantGid'``` or ```'bpVariantId'```
i.e: ```{ key: 'id', type: 'legacyVariantId' }```

--

##### title
type: ```'seoTitle'``` or ```'productTitle'``` or ```'dynamicTitle'```
i.e: ``` { key: 'title', type: 'seoTitle' or 'productTitle' }```

if type ```'dynamicTitle'``` is used values representing optionKeys must be passed as values to build the title:

i.e : ``` { key: 'title', type: 'dynamicTitle', values: ['Size', 'Color', 'Style'] }```

output: title: "Large Blue Crew"

--

##### description
type: ```seoDescription'``` or ```'productDescription```
i.e: ```{ key: 'description', type: 'seoDescription' } ```

--

##### product_type
i.e: ```{ key: 'product_type' }```

--

##### link
type: ```'shopifyUrl'``` or ```'backpackUrl'```
i.e: ```{ key: 'link', type: 'shopifyUrl' }```

if type ```'backPackUrl'``` is used values representing optionKeys will need to be passed to form the queryString that selects the variant

i.e: ```{ key: 'link', type: 'backpackUrl', values: ['Color', 'Size'] }```

output: link: ```<g:link>https://www.publicrec.com/products/weekend-full-zip?Color=Heather%20Silver%20Spoon</g:link>```

if no ```values``` passed into ```backpackUrl``` it will default to ```?variantId=LEGACY_ID```
output: link: ```<g:link>https://www.publicrec.com/products/weekend-full-zip?variant=32884022607906```

--

##### image_link
Returns the first variant image if available else the first product's image
i.e: ```{ key: 'image_link' }```

--

##### options (Optional)
Will create a new row for each selectedOptionsMap key passed:

i.e: ```{ key: 'options', values: ["Color", "Size", "Cut"] }```

outputs: ````g:color:blue, g:size: xl, g:cut:v-neck````

--

##### metadata (Optional)
Will create a new row for each variant.metadata key defined in values:

i.e: ```{ key: 'metadata', values: ["material", "fit"] }```

outputs: ```g:material:cotton, g:fit: loose```

--

##### brand
Defaults to ven value can overwrite vendor ala value 'Acme'.
type: ```'vendor'``` or ```'custom'```
i.e: ```{ key: 'brand', type: 'vendor' }```

if type ```'custom'``` is used values (as a string) can be used to overwrite the vendor

i.e: ```{ key: 'brand', type: 'custom', values: 'Acme' }```
outputs: brand: ```g:brand:Acme```

--

##### condition
Defaults to outputting "new".
i.e: ```{ key: 'condition' }```

To overwrite pass a values (as string)

i.e: ```{ key: 'condition', values: 'brand new' }```

outputs: condition: ```g:condition:brand new```

--
##### availability
Defaults to "in stock" and "out of stock" depending on the variants availability.
i.e: ```{ key: 'availability' }```

To overwrite set values as ['available string', 'unavailable string']
i.e:  ```{ key: 'availability', values: ['its in stock', 'soldout'] }```
outputs: g:availability:its in stock | soldout

--

##### price
type: ```'noCurrency' (default)``` or ```'withCurrencyCode-before'``` or ```'withCurrencyCode-after'```

i.e: ```{ key: 'price' }```

if type ```withCurrencyCode-before``` or ```withCurrencyCode-after``` is used you can provide the currencyCode via values (as a string)

i.e: ```{ key: 'price', type: 'withCurrencyCode-after', values: "USD" }```
outputs: g:price:104 USD

--

##### gtin
type: 'barcode', 'sku'
i.e: ```{ key: 'gtin', type: 'sku' }```

NOTE: 'barcode' is WIP - waiting for platform to have barcode support

##### gtin
type: 'legacyProductId', 'productGid', 'bpProductId'
i.e: ```{ key: 'item_group_id', type: 'legacyProductId' }```

----

## Example implementation

At `gatsby-config.js`

```
plugins: [
  ...otherplugins,
  {
    resolve: 'gatsby-plugin-products-feed',
    options: {
      collectionHandle: 'mens',
      exludeSoldout: true,
      publicUrl: 'https://www.publicrec.com',
      shopifyDomain: process.env.GATSBY_SHOPIFY_SHOP_DOMAIN,
      storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      feedItem: [
        { key: 'link', type: 'backpackUrl', values: ['Color'] },
        { key: 'brand', type: 'vendor', values: 'Public Rec' },
        { key: 'options', values: ['Color', 'Size', 'Style'] },
        { key: 'price', type: 'withCurrencyCode-after', values: 'USD' }
      ]
    }
  },
]
```

Note: feedItems defined will be merged with the defaults.
i.e For the above mock example feedItems would result in:

```
  ...
  feedItem: [
    // set via plugin implementation
    { key: 'link', type: 'backpackUrl', values: [ 'Color' ] },
    { key: 'brand', type: 'vendor', values: 'Public Rec' },
    { key: 'options', values: [ 'Color', 'Size', 'Style' ] },
    { key: 'price', type: 'withCurrencyCode-after', values: 'USD' },
    // defaults
    { key: 'id', type: 'legacyVariantId' },
    { key: 'title', type: 'seoTitle' },
    { key: 'description', type: 'seoDescription' },
    { key: 'product_type' },
    { key: 'image_link' },
    { key: 'condition' },
    { key: 'availability' },
    { key: 'gtin', type: 'barcode' },
    { key: 'item_group_id', type: 'legacyProductId' }
  ]
```
----

## Example output
Would be available on [production] at:
https://www.publicrec.com/products-feed.xml

Would be available on [dev] at:
http://localhost:8000/products-feed.xml


![alt%20text](https://github.com/packdigital/gatsby-plugin-products-feed/blob/master/feed-example.jpg)

----

## Gatsby build Log
```
info Generating product feed based on [mens] collection...
info
      Excluding 24 unavailable variants from product feed.
      Product feed will include 97 items
info Generated product feed with 97 items.
info Generating XML feed...
info Generated XML feed.
info Writing XML feed...
info Wrote XML feed to public/products-feed
info Product feed will be available at: https://www.publicrec.com/products-feed.xml
```