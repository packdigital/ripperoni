/**
 * @prettier
 */
const utils = require('@packdigital/ripperoni-utilities');

require('./gatsby/config/log-environments');

module.exports = ({ metadata }) => {
  return {
    siteMetadata: {
      site: {
        url: metadata.site.url || '',
        name: metadata.site.name || '',
        author: metadata.site.author || '',
        description: metadata.site.description || '',
        supportEmail: metadata.site.supportEmail || '',
        color: metadata.site.color || '#333333',
        bgColor: metadata.site.bgColor || '#ffffff',
        logo: metadata.site.logo || 'src/assets/images/logo.png',
      },
      social: {
        facebook: metadata.social.facebook || '',
        instagram: metadata.social.instagram || '',
        twitter: metadata.social.twitter || '',
      },
      seo: {
        title: metadata.seo.title || '',
        author: metadata.seo.author || '',
        description: metadata.seo.description || '',
      },
      date: {
        format: metadata.date.format || 'mm.dd.yy',
      },
      money: {
        format: metadata.money.format || '${price}',
        trimTrailingZeros: metadata.money.trimTrailingZeros || false,
      },
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-theme-ui',
      '@lekoarts/gatsby-theme-styleguide',
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: /assets/,
          },
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'images',
          path: './src/assets/images',
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-manifest',
        options: {
          start_url: '/',
          display: 'minimal-ui',
          name: metadata.site.name,
          short_name: metadata.site.name,
          description: metadata.site.description,
          theme_color: metadata.site.color,
          background_color: metadata.site.bgColor,
          icon: metadata.site.logo, // [1]
        },
      }),
    ],
  };
};

/**
 * [1] The `icon` option should:
 *       - be a square
 *       - at least 512x512
 *       - a .jpeg or .png
 *     You can provide this image by shadowing the file
 *     in the theme's src/gatsby-theme-ripperoni-core/assets/images/logo.png
 */
