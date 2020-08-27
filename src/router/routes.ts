import { RouteConfig } from 'vue-router'
// import { i18n } from 'boot/i18n'

const routes = (): RouteConfig[] => [
  // {
  //   path: '/',
  //   redirect: i18n.locale
  // },
  {

    path: '/:locale?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Index.vue') },
      { path: 'country/:country', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
