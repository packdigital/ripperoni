/**
 * @prettier
 */
// This does not support nested pages (level 2 and up)
// If you're working with deeply nested pages, remove this or rework it.

export const schemaGenerator = ({
  location,
  canonical,
  url,
  pageTitle,
  name,
  pageTitleFull,
}) => {
  const isSubPage = pageTitle && location.pathname !== '/';

  let schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: canonical,
      name: pageTitle || name,
      alternateName: pageTitleFull,
    },
  ];

  if (isSubPage) {
    schema.push({
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': url,
            name: name,
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': canonical,
            name: pageTitle,
          },
        },
      ],
    });
  }

  return schema;
};