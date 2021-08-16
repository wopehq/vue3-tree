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
      { text: "Seo.do", link: "https://seo.do/"}
    ],
    sidebarDepth: 2,
    // backToHome: "Home",
    repo: 'teamseodo/vue3-tree',
  },
};