import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { StateInterface } from '../store'

// eslint-disable-next-line import/no-unused-modules
export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter)
  return new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
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
                'src/pages/admin/list/list-page.vue'
              ),
          },
          {
            name: 'admin-country',
            path: 'country/:originCode',
            component: () =>
              import(
                /* webpackChunkName: "admin-country" */
                'src/pages/admin/edit/edit-page.vue'
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
              import(
                /* webpackChunkName: "page-index" */ 'pages/index-page.vue'
              ),
          },
          {
            name: 'origin',
            path: 'country/:originSlug/',
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
          import(
            /* webpackChunkName: "page-error" */ 'pages/error-404-page.vue'
          ),
      },
    ],
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
})
