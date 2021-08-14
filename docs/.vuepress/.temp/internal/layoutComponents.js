import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("C:/Users/dgknc/Masaüstü/vue3-tree/docs/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("C:/Users/dgknc/Masaüstü/vue3-tree/docs/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
