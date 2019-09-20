module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
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
    'prefer-arrow-callback': 'warn',
    'arrow-spacing': 'warn',
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-body-style': ['warn', 'as-needed'],
    'no-confusing-arrow': 'warn',
    'no-dupe-class-members': 'warn',
    'no-duplicate-imports': 'warn',
    'dot-notation': 'warn',
    'no-restricted-properties': 'warn',
    'one-var': 'warn',
    'no-multi-assign': 'warn',
    'operator-linebreak': 'warn',
    'no-console': 'warn',
    'import/first': 'warn',
    'import/no-webpack-loader-syntax': 'warn',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-wrap-multilines': [
      'warn',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
      },
    ],
    'react/jsx-closing-tag-location': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-pascal-case': ['warn'],
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
        html: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
}
