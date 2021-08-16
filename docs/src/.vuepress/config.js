const { path } = require('@vuepress/utils');
const sidebar = require("./sidebar");

module.exports = {
  lang: "en-US",
  title: "vue3-tree",
  // description: "description",
  themeConfig: {
    sidebar,
    logo: '/logo.svg',
    navbar: [
      { text: "Guide", link: "/guide/" },
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
        },
      },
    ],
  ],
};