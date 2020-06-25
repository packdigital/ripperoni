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
      'ignore': ['@theme/']
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
        'parent',
        'sibling',
        'index'
      ],
      'pathGroups': [
        // 1. externals
        // 2. internal utilities
        // 3. theme components
        // 4. theme catch-all (except for hooks)
        // 5. theme hooks
        // 6. layout components
        // 7. components
        // 8. assets and static files
        {
          'pattern': '@{utils,theme/utility/**}',
          'group': 'external',
          'position': 'after'
        },
        {
          'pattern': '@theme2/**',
          'group': 'internal',
          'position': 'before'
        },
        {
          'pattern': '@theme/**',
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
          'pattern': '@{assets,static}/**',
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
      'eslint-import-resolver-webpack': {
        'extensions': [
          '.js',
          '.jsx'
        ]
      },
      'eslint-import-resolver-custom-alias': {
        'alias': {
          'src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@images': './src/assets/images',
          '@layouts': './src/layouts',
          '@static': './static',
          '@theme': 'node_modules/@packdigital/gatsby-theme-ripperoni-components/src',
          '@utils': 'node_modules/@packdigital/ripperoni-utilities'
        },
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    }
  },
  'globals': {
    '__PATH_PREFIX__': true
  }
};
