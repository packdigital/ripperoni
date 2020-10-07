/* eslint-disable */

module.exports = {
  'parser': 'babel-eslint',
  'globals': {
    '__PATH_PREFIX__': true
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true,
  },
  'parserOptions':  {
    'ecmaVersion':  2018,
    'sourceType':  'module',
    'ecmaFeatures':  {
      'jsx':  true
    }
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:import/recommended',
    // 1. enables eslint-plugin-prettier,
    // 2. sets prettier/prettier rule to error
    // 3. extends eslint-config-prettier configuration
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  'rules': {
    // disabled
    'strict': 'off',
    'react/no-unescaped-entities': 'off',

    // additional rules
    'no-unused-vars': 'warn',
    'max-lines': ['warn', {
      'max': 125,
      'skipBlankLines': true,
      'skipComments': true
    }],
    'sort-imports': ['warn', {
      'ignoreDeclarationSort': true
    }],

    // react rules
    'react/prop-types': 'warn',
    'react/display-name': 'warn',

    // import rules
    'import/no-default-export': 'warn',
    'import/no-unresolved': ['warn', {
      // because of theme shadowing, any import alias of a gatsby theme needs to
      // included here since we don't know how the module is being resolved
      'ignore': [
        '@theme/',
        '@ripperoni/account',
        '@ripperoni/message-bus',
        '@ripperoni/cart',
        '@ripperoni/cms',
        '@ripperoni/components/hooks',
        '@ripperoni/components',
        '@ripperoni/core',
        '@ripperoni/dev',
        '@ripperoni/hooks',
        '@ripperoni/marketing',
        '@ripperoni/search',
        '@ripperoni/store',
        '@ripperoni/utilities',
      ]
    }],
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index']
      ],
      'pathGroups': [
        // 1. externals
        // 2. ripperoni-themes and modules - @ripperoni
        // 3. project layouts - @layouts
        // 4. project components - @components
        // 5. project resources - @assets, @hooks, @images, @static
        // 6. everything else
        {
          'pattern': '@ripperoni/**',
          'group': 'external',
          'position': 'after'
        },
        {
          'pattern': '@layouts/**',
          'group': 'internal',
          'position': 'before'
        },
        {
          'pattern': '@components/**',
          'group': 'internal',
          'position': 'before'
        },
        {
          'pattern': '@{assets,hooks,images,static}/**',
          'group': 'internal',
          'position': 'before'
        },
      ],
      'newlines-between': 'always',
      'pathGroupsExcludedImportTypes': []
    }]
  },
  'settings': {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      'alias': {
        'map': [
          ['src', './src'],
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@context', './src/context'],
          ['@hooks', './src/hooks'],
          ['@images', './src/assets/images'],
          ['@layouts', './src/layouts'],
          ['@static', './static'],
          ['@ripperoni/account/theme', '@packdigital/gatsby-theme-ripperoni-account/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/cart/theme', '@packdigital/gatsby-theme-ripperoni-cart/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/components/theme', '@packdigital/gatsby-theme-ripperoni-components/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/core/theme', '@packdigital/gatsby-theme-ripperoni-core/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/dev/theme', '@packdigital/gatsby-theme-ripperoni-dev/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/marketing/theme', '@packdigital/gatsby-theme-ripperoni-marketing/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/search/theme', '@packdigital/gatsby-theme-ripperoni-search/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/store/theme', '@packdigital/gatsby-theme-ripperoni-store/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/account', '@packdigital/gatsby-theme-ripperoni-account/src'],
          ['@ripperoni/message-bus', '@packdigital/gatsby-theme-ripperoni-message-bus/src'],
          ['@ripperoni/cart', '@packdigital/gatsby-theme-ripperoni-cart/src'],
          ['@ripperoni/cms', '@packdigital/gatsby-theme-ripperoni-cms/src'],
          ['@ripperoni/components', '@packdigital/gatsby-theme-ripperoni-components/src'],
          ['@ripperoni/core', '@packdigital/gatsby-theme-ripperoni-core/src'],
          ['@ripperoni/dev', '@packdigital/gatsby-theme-ripperoni-dev/src'],
          ['@ripperoni/marketing', '@packdigital/gatsby-theme-ripperoni-marketing/src'],
          ['@ripperoni/search', '@packdigital/gatsby-theme-ripperoni-search/src'],
          ['@ripperoni/store', '@packdigital/gatsby-theme-ripperoni-store/src'],
          ['@ripperoni/utilities', '@packdigital/ripperoni-utilities'],

          // legacy aliases
          ['@theme', '@packdigital/gatsby-theme-ripperoni/src'],
          ['@theme2', '@packdigital/gatsby-theme-ripperoni-components/src'],
          ['@utils', '@packdigital/ripperoni-utilities']
        ],
        'extensions': ['.js', '.jsx', '.json']
      },
    }
  },
}
