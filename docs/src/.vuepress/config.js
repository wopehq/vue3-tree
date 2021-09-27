const { path } = require('@vuepress/utils');
const sidebar = require('./sidebar');

module.exports = {
  base: '/vue3-tree/',
  lang: 'en-US',
  title: 'vue3-tree',
  themeConfig: {
    logo: '/logo.svg',
    navbar: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Seo.do', link: 'https://seo.do/' },
    ],
    sidebar,
    sidebarDepth: 2,
    repo: 'teamseodo/vue3-tree',
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        components: {
          Footer: path.resolve(__dirname, './components/shared/Footer.vue'),
          Tree: path.resolve(__dirname, '../../node_modules/vue3-tree/src/lib/index.js'),
        },
      },
    ],
  ],
};
