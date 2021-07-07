import type { IVueI18n } from 'vue-i18n'
import type { RouteConfig, RouterOptions } from 'vue-router'
import VueRouter from 'vue-router'

import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'
import { useRouter } from '@/shared/src/composables/use-plugins'
import {
  transformCountryCodeToOriginSlug,
  transformDestinationSlugToCode,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function getRoutes(i18n: IVueI18n): RouteConfig[] {
  return [
    {
      name: 'index-nolocale-nocountry',
      path: '/',
      redirect() {
        return useRouter().resolve({
          name: 'index-targeted',
          params: {
            locale: i18n.locale,
            originSlug: transformCountryCodeToOriginSlug(
              getPersistedOriginOrDefault(),
            ),
          },
        }).href
      },
    },
    {
      path: '/:locale/',
      component: () =>
        import(
          /* webpackMode: "eager" */
          /* webpackChunkName: "layout" */ '@/front/src/layouts/main-layout.vue'
        ),
      props(route) {
        const props = {
          showTravelBar: false,
          fullHeight: false,
          containerize: true,
        }
        switch (route.name) {
          case 'index-targeted':
            props.fullHeight = true
            props.showTravelBar = true
            props.containerize = false
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
          redirect: '/',
        },
        {
          name: 'privacy',
          path: 'privacy-policy',
          component: () =>
            import(
              /* webpackChunkName: "page-privacy-policy" */ '@/front/src/pages/privacy-policy.vue'
            ),
        },
        {
          name: 'terms',
          path: 'terms-and-conditions',
          component: () =>
            import(
              /* webpackChunkName: "page-terms" */ '@/front/src/pages/terms.vue'
            ),
        },
        {
          name: 'contact',
          path: 'contact-us',
          component: () =>
            import(
              /* webpackChunkName: "page-contact" */ '@/front/src/pages/contact/contact.vue'
            ),
        },
        {
          name: 'origin',
          path: `${i18n.t('page.country.route')}/:originSlug/:searchId?`,
          component: () =>
            import(
              /* webpackChunkName: "page-origin" */
              '@/front/src/pages/country/country-page.vue'
            ),
          props(route) {
            return {
              originCode: transformOriginSlugToCode(route.params.originSlug),
            }
          },
        },

        {
          name: 'guide',
          path: 'travel-guide/',
          component: () =>
            import(
              /* webpackChunkName: "page-origin" */
              '@/front/src/pages/guide/guide-page.vue'
            ),
        },
        {
          name: 'destination',
          path: `${i18n.t('page.country.route')}/:originSlug/${i18n.t(
            'page.destination.route',
          )}/:destinationSlug/:searchId?`,
          component: () =>
            import(
              /* webpackChunkName: "page-destination" */
              '@/front/src/pages/destination/destination-page.vue'
            ),
          props(route) {
            return {
              originCode: transformOriginSlugToCode(route.params.originSlug),
              destinationCode: transformDestinationSlugToCode(
                route.params.destinationSlug,
              ),
            }
          },
        },
        {
          name: 'index-targeted',
          path: `${i18n.t('page.index.route')}/:originSlug/`,
          component: () =>
            import(
              /* webpackChunkName: "page-index" */ '@/front/src/pages/index/index-page.vue'
            ),
          props(route) {
            return {
              originCode: transformOriginSlugToCode(route.params.originSlug),
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
  ]
}

export function createGenericRouter(
  i18n: IVueI18n,
  options?: RouterOptions,
): VueRouter {
  return new VueRouter({
    scrollBehavior: function (to) {
      return to.hash ? { selector: to.hash } : { x: 0, y: 0 }
    },
    routes: getRoutes(i18n),
    ...options,
  })
}
