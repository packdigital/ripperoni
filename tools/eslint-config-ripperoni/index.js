/* eslint-disable max-lines */
module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true
  },
  'parserOptions':  {
    'ecmaVersion':  2018,
    'sourceType':  'module',
    'ecmaFeatures':  {
      'jsx':  true
    }
  },
  'rules': {
    'strict': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-max-props-per-line': [2, {
      'maximum': 1,
      'when': 'always'
    }],
    'react/jsx-indent-props': ['warn', 2],
    // 'react/jsx-one-expression-per-line': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-first-prop-new-line': 'warn',
    'react/jsx-tag-spacing': ['warn', {
      'beforeSelfClosing': 'always',
    }],
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'import/no-default-export': 'warn',
    'import/no-unresolved': ['warn', {
      // because of theme shadowing, any import alias of a gatsby theme needs to
      // included here since we don't know how the module is being resolved
      'ignore': [
        '@theme/',
        '@ripperoni/account',
        '@ripperoni/cart',
        '@ripperoni/components/hooks',
        '@ripperoni/components',
        '@ripperoni/core',
        '@ripperoni/debug',
        '@ripperoni/hooks',
        '@ripperoni/marketing',
        '@ripperoni/search',
        '@ripperoni/store',
        '@ripperoni/utilities',

        // not sure about these...
        // '@ripperoni/account/theme',
        // '@ripperoni/cart/theme',
        // '@ripperoni/components/theme',
        // '@ripperoni/core/theme',
        // '@ripperoni/debug/theme',
        // '@ripperoni/marketing/theme',
        // '@ripperoni/search/theme',
        // '@ripperoni/store/theme',
      ]
    }],
    'max-lines': ['warn', {
      'max': 125,
      'skipBlankLines': true,
      'skipComments': true
    }],
    'sort-imports': ['warn', {
      'ignoreDeclarationSort': true
    }],
    'semi': ['warn', 'always', {
      'omitLastInOneLineBlock': true
    }],
    'no-multiple-empty-lines': ['warn', {
      'max': 2,
      'maxBOF': 0
    }],
    'quotes': ['warn', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': false
    }],
    'import/newline-after-import': ['warn', {
      'count': 2
    }],
    'object-curly-spacing': ['error', 'always', {
      'objectsInObjects': false,
      'arraysInObjects': true
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
        // 5. project resources - @assets, @images, @static
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
          'pattern': '@{assets,images,static}/**',
          'group': 'index',
          'position': 'after'
        }
      ],
      'newlines-between': 'always',
      'pathGroupsExcludedImportTypes': []
    }]
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    // 1. enables eslint-plugin-prettier,
    // 2. sets prettier/prettier rule to error
    // 3. extends eslint-config-prettier configuration
    'prettier',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard'
  ],
  'plugins': [
    'jsx-a11y'
  ],
  'settings': {
    'react': {
      'version': 'detect'
    },
    'import/ignore': [],
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@images', './src/assets/images'],
          ['@layouts', './src/layouts'],
          ['@static', './static'],
          ['@ripperoni/account/theme', '@packdigital/gatsby-theme-ripperoni-account/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/account', '@packdigital/gatsby-theme-ripperoni-account/src'],
          ['@ripperoni/cart/theme', '@packdigital/gatsby-theme-ripperoni-cart/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/cart', '@packdigital/gatsby-theme-ripperoni-cart/src'],
          ['@ripperoni/components/theme', '@packdigital/gatsby-theme-ripperoni-components/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/components/hooks', '@packdigital/gatsby-theme-ripperoni-components/src/hooks'],
          ['@ripperoni/components', '@packdigital/gatsby-theme-ripperoni-components/src/components'],
          ['@ripperoni/core/theme', '@packdigital/gatsby-theme-ripperoni-core/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/core', '@packdigital/gatsby-theme-ripperoni-core/src'],
          ['@ripperoni/debug/theme', '@packdigital/gatsby-theme-ripperoni-debug/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/debug', '@packdigital/gatsby-theme-ripperoni-debug/src'],
          ['@ripperoni/hooks', '@packdigital/gatsby-theme-ripperoni-components/src/hooks'],
          ['@ripperoni/marketing/theme', '@packdigital/gatsby-theme-ripperoni-marketing/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/marketing', '@packdigital/gatsby-theme-ripperoni-marketing/src'],
          ['@ripperoni/search/theme', '@packdigital/gatsby-theme-ripperoni-search/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/search', '@packdigital/gatsby-theme-ripperoni-search/src'],
          ['@ripperoni/store/theme', '@packdigital/gatsby-theme-ripperoni-store/src/gatsby-plugin-theme-ui'],
          ['@ripperoni/store', '@packdigital/gatsby-theme-ripperoni-store/src'],
          ['@ripperoni/utilities', '@packdigital/ripperoni-utilities'],
          // legacy aliases
          ['@theme', '@packdigital/gatsby-theme-ripperoni/src'],
          ['@theme2', '@packdigital/gatsby-theme-ripperoni-components/src'],
          ['@utils', '@packdigital/ripperoni-utilities']
        ],
        extensions: ['.js', '.jsx']
      },
    }
  },
  'globals': {
    '__PATH_PREFIX__': true
  }
};
