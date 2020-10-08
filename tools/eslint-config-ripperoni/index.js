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
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index']
      ],
      'pathGroups': [
        // 1. externals
        // 1. external ripperoni - @packdigital
        // 1. internal ripperoni - @ripperoni
        // 1. project layouts - @layouts
        // 1. project components - @components
        // 1. project resources - @assets, @hooks, @images, @static
        // 1. everything else
        {
          'pattern': '@packdigital/**',
          'group': 'external',
          'position': 'after'
        },
        {
          'pattern': '@ripperoni/**',
          'group': 'internal',
          'position': 'before'
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
      'node': {
        'extensions': ['.js', '.jsx']
      },
      'alias': [
        ['src', './src'],
        ['@assets', './src/assets'],
        ['@components', './src/components'],
        ['@context', './src/context'],
        ['@hooks', './src/hooks'],
        ['@images', './src/assets/images'],
        ['@layouts', './src/layouts'],
        ['@static', './static'],
        ['@ripperoni/account', '@packdigital/gatsby-theme-ripperoni-account'],
        ['@ripperoni/cart', '@packdigital/gatsby-theme-ripperoni-cart'],
        ['@ripperoni/cms', '@packdigital/gatsby-theme-ripperoni-cms'],
        ['@ripperoni/components', '@packdigital/gatsby-theme-ripperoni-components'],
        ['@ripperoni/core', '@packdigital/gatsby-theme-ripperoni-core'],
        ['@ripperoni/dev', '@packdigital/gatsby-theme-ripperoni-dev'],
        ['@ripperoni/marketing', '@packdigital/gatsby-theme-ripperoni-marketing'],
        ['@ripperoni/message-bus', '@packdigital/gatsby-theme-ripperoni-message-bus'],
        ['@ripperoni/search', '@packdigital/gatsby-theme-ripperoni-search'],
        ['@ripperoni/store', '@packdigital/gatsby-theme-ripperoni-store'],
        ['@ripperoni/utilities', '@packdigital/ripperoni-utilities'],
      ],
    }
  },
}
