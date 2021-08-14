const sidebar = require("./sidebar");

module.exports = {
  lang: "en-US",
  title: "vue3-tree",
  // description: "description",
  themeConfig: {
    sidebar,
    navbar: [
      { text: "Guide", link: "/guide/" },
    ],
    sidebarDepth: 2,
    backToHome: "Back Home",
  },
};