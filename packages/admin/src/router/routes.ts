import { RouteConfig } from 'vue-router'

import Layout from '@/admin/src/layouts/layout.vue'
// import EditPage from '@/admin/src/pages/edit/edit-page.vue'
import ErrorPage from '@/admin/src/pages/error-page.vue'
import ListPage from '@/admin/src/pages/list/list-page.vue'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'admin-index',
        path: '/',
        component: ListPage,
      },
      // {
      //   name: 'admin-country',
      //   path: 'country/:originCode',
      //   component: EditPage,
      //   props: true,
      // },
    ],
  },
  {
    path: '*',
    component: ErrorPage,
  },
]

export default routes
