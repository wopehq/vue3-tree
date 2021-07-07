module.exports = {
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    indent: ['error', 2],
    'comma-dangle': [2, 'never']
  }
}
