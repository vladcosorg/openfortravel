import { RouteRecordRaw } from 'vue-router'

import { originTransformer } from '@/front/src/router/transformers/origin'
import { useRouter } from '@/shared/src/composables/use-plugins'

const routeID = 'forBusiness'
export const parameterTransformers = {
  originSlug: originTransformer,
}

export function getBusinessRouteConfig(): RouteRecordRaw {
  return {
    name: routeID,
    path: 'for-business',
    component: () =>
      import(
        /* webpackChunkName: "page-business" */ '@/front/src/pages/business/business-page.vue'
      ),
  }
}

export function getBusinessPageURL(): string {
  return useRouter().resolve({
    name: routeID,
  }).href
}
