import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-3706649a","/404.html","",["/404"]],
  ["v-8daa1a0e","/","deneme",["/index.html","/README.md"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
