import {
  Router,
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'

import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'
import { getTravelAlertsRouteConfig } from '@/front/src/pages/news/router'
import {
  useRouter,
  getI18nInstance,
} from '@/shared/src/composables/use-plugins'
import {
  transformCountryCodeToOriginSlug,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function getRoutes(
  i18n: ReturnType<typeof getI18nInstance>,
): Router['options']['routes'] {
  return [
    {
      name: 'index-nolocale-nocountry',
      path: '/',
      redirect() {
        return useRouter().resolve({
          name: 'index-targeted',
          params: {
            locale: i18n.locale.value,
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
          containerize: true,
        }
        switch (route.name) {
          case 'index-targeted':
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
        getTravelAlertsRouteConfig(),
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
          name: 'destination-old',
          path: `${i18n.t('page.country.route')}/:originSlug/${i18n.t(
            'page.destination.route',
          )}/:destinationSlug`,
        },
        {
          name: 'destination',
          path: 'travel-restrictions/from-:originSlug/to-:destinationSlug/for/:parts+',
          component: () =>
            import(
              /* webpackChunkName: "page-destination" */
              '@/front/src/pages/destination/destination-page.vue'
            ),
        },
        {
          name: 'origin',
          path: 'travel-restrictions/from-:originSlug/for/:parts+',
          component: () =>
            import(
              /* webpackChunkName: "page-origin" */
              '@/front/src/pages/country/country-page.vue'
            ),
        },
        {
          name: 'origin-old',
          path: `${i18n.t('page.country.route')}/:originSlug`,
        },
        {
          name: 'origin-old-temp',
          path: `${i18n.t('page.country.route')}/:originSlug/as/:parts+`,
        },
        {
          name: 'index-targeted',
          path: 'travel-restrictions/from-:originSlug/',
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
        {
          name: 'index-targeted-old',
          path: `${i18n.t('page.index.route')}/:originSlug/`,
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
      ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      redirect: '/',
    },
  ]
}

export function createGenericRouter(
  i18n: ReturnType<typeof getI18nInstance>,
  isServer?: boolean,
): Router {
  const createHistory = isServer ? createMemoryHistory : createWebHistory
  return createRouter({
    routes: getRoutes(i18n),
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,
    ),
  })
}
