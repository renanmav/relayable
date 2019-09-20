module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-new-object': 'warn',
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'no-array-constructor': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-template': 'warn',
    'template-curly-spacing': 'warn',
    'no-eval': 'error',
    'no-useless-escape': 'warn',
    'space-before-blocks': 'warn',
    'space-before-function-paren': 'warn',
    'prefer-arrow-callback': 'warn',
    'arrow-spacing': 'warn',
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-body-style': ['warn', 'as-needed'],
    'no-confusing-arrow': 'warn',
    'implicit-arrow-linebreak': 'warn',
    'no-dupe-class-members': 'warn',
    'no-duplicate-imports': 'warn',
    'dot-notation': 'warn',
    'no-restricted-properties': 'warn',
    'one-var': 'warn',
    'no-multi-assign': 'warn',
    'operator-linebreak': 'warn',
    'no-console': 'warn',
    // ===== Import =====
    'import/prefer-default-export': 'warn',
    'import/first': 'warn',
    'import/no-webpack-loader-syntax': 'warn',
    'import/order': ['error', { 'newlines-between': 'always' }],
    // ===== JSX =====
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-no-bind': ['warn'],
    'react/jsx-one-expression-per-line': ['warn', { allow: 'literal' }],
    'react/jsx-wrap-multilines': [
      'warn',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line'
      }
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandFirst: true
      }
    ],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-pascal-case': ['warn'],
    // ===== React =====
    'react/prefer-stateless-function': ['warn'],
    'react/no-this-in-sfc': 'warn',
    'react/no-render-return-value': 'warn',
    'react/no-danger': 'warn',
    'react/no-unsafe': ['warn', { checkAliases: true }],
    'react/no-typos': 'warn',
    'react/destructuring-assignment': ['warn'],
    'react/no-is-mounted': 'warn',
    'react/no-string-refs': ['warn', { noTemplateLiterals: true }],
    'react/no-multi-comp': ['warn', { ignoreStateless: true }],
    'react/sort-comp': ['warn'],
    'react/jsx-curly-newline': ['warn'],
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true
      }
    ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {}
    }
  }
}
