const { path } = require('@vuepress/utils');
const sidebar = require('./sidebar');

module.exports = {
  lang: 'en-US',
  title: 'vue3-tree',
  // description: "description",
  themeConfig: {
    sidebar,
    logo: '/logo.svg',
    navbar: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Seo.do', link: 'https://seo.do/' },
    ],
    sidebarDepth: 2,
    // backToHome: "Home",
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
