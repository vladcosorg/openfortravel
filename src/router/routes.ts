import { Route, RouteConfig } from 'vue-router'
// import { i18n } from 'boot/i18n'

const routes = (): RouteConfig[] => [
  // {
  //   path: '/',
  //   redirect: i18n.locale
  // },
  {
    path: '/admin',
    component: () =>
      import(/* webpackChunkName: "admin-layout" */ 'layouts/AdminLayout.vue'),

    children: [
      {
        name: 'admin-index',
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "admin-list" */ 'pages/admin/AdminListPage.vue'
          ),
      },
      {
        name: 'admin-country',
        path: 'country/:originCode',
        component: () =>
          import(
            /* webpackChunkName: "admin-country" */ 'pages/admin/AdminCountryPage.vue'
          ),
        props: true,
      },
    ],
  },
  {
    path: '/:locale?',
    component: () =>
      import(/* webpackChunkName: "main-layout" */ 'layouts/MainLayout.vue'),
    props: {
      fullHeight: true,
    },
    children: [
      {
        name: 'index',
        path: '',
        component: () =>
          import(/* webpackChunkName: "page-index" */ 'pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/:locale/',
    component: () =>
      import(/* webpackChunkName: "main-layout" */ 'layouts/MainLayout.vue'),
    props: { showTravelBar: false },
    children: [
      {
        name: 'index',
        path: '',
        component: () =>
          import(/* webpackChunkName: "page-index" */ 'pages/IndexPage.vue'),
      },
      {
        name: 'destination',
        path: 'country/:originCode/destination/:destinationCode/',
        component: () =>
          import(
            /* webpackChunkName: "page-destination" */ 'pages/destination/DestinationPage.vue'
          ),
        props: (route: Route) => {
          return {
            showTravelBar: false,
            ...route.params,
          }
        },
      },
    ],
  },
  {
    path: '/:locale/',
    component: () =>
      import(/* webpackChunkName: "main-layout" */ 'layouts/MainLayout.vue'),
    children: [
      {
        name: 'origin',
        path: 'country/:originCode/',
        component: () =>
          import(
            /* webpackChunkName: "page-origin" */ 'pages/country/CountryPage.vue'
          ),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "page-error" */ 'pages/Error404Page.vue'),
  },
]

export default routes
