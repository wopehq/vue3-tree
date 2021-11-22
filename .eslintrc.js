module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // js
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-multi-spaces': 'error',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    camelcase: ['error', { properties: 'never' }],
    semi: ['error'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-before-blocks': [2, 'always'],
    // vue
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1,
    }],
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-spacing': 'error',
  },
};
