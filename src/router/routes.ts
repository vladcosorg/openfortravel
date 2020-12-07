import { IVueI18n } from 'vue-i18n'
import VueRouter, { RouterOptions } from 'vue-router'

import {
  transformCanonicalSlugToCode,
  transformDestinationSlugToCode,
  transformOriginSlugToCode,
} from 'src/modules/country-list/country-list-helpers'

export function createGenericRouter(
  i18n: IVueI18n,
  options?: RouterOptions,
): VueRouter {
  return new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      {
        path: '/:locale/admin',
        component: () =>
          import(
            /* webpackChunkName: "admin-layout"  */
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
        path: '/',
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
            path: `${i18n.t('page.country.route')}/:originSlug/`,
            // alias: 'travel/from/:originSlug/',
            component: () =>
              import(
                /* webpackChunkName: "page-origin" */
                'pages/country/country-page.vue'
              ),
            props(route) {
              return {
                unsafeOriginCode: transformOriginSlugToCode(
                  route.params.originSlug,
                ),
              }
            },
          },
          {
            name: 'origin-fallback',
            path: 'travel/from/:originSlug/',
            component: () =>
              import(
                /* webpackChunkName: "page-origin" */
                'pages/country/country-page.vue'
              ),
            props(route) {
              return {
                unsafeOriginCode: transformCanonicalSlugToCode(
                  route.params.originSlug,
                ),
                isFallback: true,
              }
            },
          },
          {
            name: 'destination',
            path: `${i18n.t('page.country.route')}/:originSlug/${i18n.t(
              'page.destination.route',
            )}/:destinationSlug/`,
            // alias: 'travel/from/:originSlug/to/:destinationSlug',
            component: () =>
              import(
                /* webpackChunkName: "page-destination" */
                'pages/destination/destination-page.vue'
              ),
            props(route) {
              return {
                originCode: transformOriginSlugToCode(
                  route.params.originSlug,
                  true,
                ),
                destinationCode: transformDestinationSlugToCode(
                  route.params.destinationSlug,
                ),
              }
            },
          },
          {
            name: 'destination-fallback',
            path: 'travel/from/:originSlug/to/:destinationSlug',
            // alias: 'travel/from/:originSlug/to/:destinationSlug',
            component: () =>
              import(
                /* webpackChunkName: "page-destination" */
                'pages/destination/destination-page.vue'
              ),
            props(route) {
              return {
                originCode: transformCanonicalSlugToCode(
                  route.params.originSlug,
                ),
                destinationCode: transformCanonicalSlugToCode(
                  route.params.destinationSlug,
                ),
                isFallback: true,
              }
            },
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
    ...options,
  })
}
