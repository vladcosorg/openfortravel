import { RouteConfig } from 'vue-router'
// import { i18n } from 'boot/i18n'

const routes = (): RouteConfig[] => [
  // {
  //   path: '/',
  //   redirect: i18n.locale
  // },
  {

    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { name: 'admin-index', path: 'list', component: () => import('pages/admin/Page.vue') },
      { name: 'admin-country', path: 'country/:country', component: () => import('pages/admin/Country.vue') }
    ]
  },
  {

    path: '/:locale?',
    component: () => import('layouts/IntroLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Index.vue') }
    ]

  },

  {

    path: '/:locale/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'country', path: 'country/:country', component: () => import('pages/country/Page.vue') }
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
