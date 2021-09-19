import { RouteRecordRaw } from 'vue-router'

import { getRouteURL } from '@/front/src/router/transformers/_helpers'
import { DecodedParameters } from '@/front/src/router/transformers/_types'
import { originTransformer } from '@/front/src/router/transformers/origin'

const routeID = 'travelAlertsVaccinated'
export const parameterTransformers = {
  originSlug: originTransformer,
}

export function getTravelAlertsRouteConfig(): RouteRecordRaw {
  return {
    name: routeID,
    path: 'news/travel-alerts/where-vaccinated-tourists-can-travel-from-:originSlug',
    component: () =>
      import(
        /* webpackChunkName: "page-news" */ '@/front/src/pages/news/blog.vue'
      ),
  }
}

export function getTravelAlertsURL(
  customParameters?: DecodedParameters<typeof parameterTransformers>,
): string {
  return getRouteURL(routeID, parameterTransformers, customParameters)
}
