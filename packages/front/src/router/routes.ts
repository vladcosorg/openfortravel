import { IVueI18n } from 'vue-i18n'
import VueRouter, { RouterOptions } from 'vue-router'

import {
  transformCanonicalSlugToCode,
  transformDestinationSlugToCode,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function createGenericRouter(
  i18n: IVueI18n,
  options?: RouterOptions,
): VueRouter {
  return new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      { name: 'index-nolocale-nocountry', path: '/' },
      {
        path: '/:locale/',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '@/front/src/layouts/main-layout.vue'
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
            name: 'index-redirect',
            path: '',
            component: () =>
              import(
                /* webpackChunkName: "page-index" */ '@/front/src/pages/index-page.vue'
              ),
          },
          {
            name: 'index-targeted',
            path: `${i18n.t('page.index.route')}/:originSlug/`,
            component: () =>
              import(
                /* webpackChunkName: "page-index" */ '@/front/src/pages/index-page.vue'
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
            name: 'origin',
            path: `${i18n.t('page.country.route')}/:originSlug/`,
            // alias: 'travel/from/:originSlug/',
            component: () =>
              import(
                /* webpackChunkName: "page-origin" */
                '@/front/src/pages/country/country-page.vue'
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
                '@/front/src/pages/country/country-page.vue'
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
                '@/front/src/pages/destination/destination-page.vue'
              ),
            props(route) {
              return {
                unsafeOriginCode: transformOriginSlugToCode(
                  route.params.originSlug,
                  true,
                ),
                unsafeDestinationCode: transformDestinationSlugToCode(
                  route.params.destinationSlug,
                  true,
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
                '@/front/src/pages/destination/destination-page.vue'
              ),
            props(route) {
              return {
                unsafeOriginCode: transformCanonicalSlugToCode(
                  route.params.originSlug,
                ),
                unsafeDestinationCode: transformCanonicalSlugToCode(
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
            /* webpackChunkName: "page-error" */ '@/front/src/pages/error-404-page.vue'
          ),
      },
    ],
    ...options,
  })
}
