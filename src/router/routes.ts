import { RouteConfig } from 'vue-router'

const routes = (): RouteConfig[] => [
  {
    path: '/admin/test',
    name: 'admin-index',
    component: () =>
      import(
        /* webpackChunkName: "test-layout" */
        'layouts/test-layout.vue'
      ),
  },
  {
    path: '/admin',
    component: () =>
      import(
        /* webpackChunkName: "admin-layout" */
        'layouts/admin-layout.vue'
      ),

    children: [
      {
        name: 'admin-index',
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "admin-list" */
            'pages/admin/admin-list-page.vue'
          ),
      },
      {
        name: 'admin-country',
        path: 'country/:originCode',
        component: () =>
          import(
            /* webpackChunkName: "admin-country" */
            'pages/admin/admin-country-page.vue'
          ),
        props: true,
      },
    ],
  },
  {
    path: '/:locale/',
    component: () =>
      import(
        /* webpackChunkName: "main-layout" */
        'layouts/main-layout.vue'
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
          import(/* webpackChunkName: "page-index" */ 'pages/index-page.vue'),
      },
      {
        name: 'origin',
        path: 'country/:originCode/',
        component: () =>
          import(
            /* webpackChunkName: "page-origin" */
            'pages/country/country-page.vue'
          ),
        props: true,
      },
      {
        name: 'destination',
        path: 'country/:originCode/destination/:destinationCode/',
        component: () =>
          import(
            /* webpackChunkName: "page-destination" */
            'pages/destination/destination-page.vue'
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
      import(/* webpackChunkName: "page-error" */ 'pages/error-404-page.vue'),
  },
]

export default routes
