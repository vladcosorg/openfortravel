import { RouteConfig } from 'vue-router'

const routes = (): RouteConfig[] => [
  {
    path: '/:locale/',
    component: () =>
      import(
        /* webpackChunkName: "main-layout" */
        'layouts/MainLayout.vue'
      ),
    props(route) {
      const props = {
        showTravelBar: false,
        fullHeight: false,
      }
      switch (route.name) {
        case 'index':
          props.fullHeight = true
          props.showTravelBar = true
          break
        case 'origin':
          props.showTravelBar = true
          break
      }

      return props
    },
    children: [
      {
        name: 'index',
        path: '',
        component: () =>
          import(/* webpackChunkName: "page-index" */ 'pages/IndexPage.vue'),
      },
      {
        name: 'origin',
        path: 'country/:originCode/',
        component: () =>
          import(
            /* webpackChunkName: "page-origin" */
            'pages/country/CountryPage.vue'
          ),
        props: true,
      },
      {
        name: 'destination',
        path: 'country/:originCode/destination/:destinationCode/',
        component: () =>
          import(
            /* webpackChunkName: "page-destination" */
            'pages/destination/DestinationPage.vue'
          ),
        props: true,
      },
    ],
  },
  {
    path: '/admin',
    component: () =>
      import(
        /* webpackChunkName: "admin-layout" */
        'layouts/AdminLayout.vue'
      ),

    children: [
      {
        name: 'admin-index',
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "admin-list" */
            'pages/admin/AdminListPage.vue'
          ),
      },
      {
        name: 'admin-country',
        path: 'country/:originCode',
        component: () =>
          import(
            /* webpackChunkName: "admin-country" */
            'pages/admin/AdminCountryPage.vue'
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
