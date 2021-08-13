import { useRouter } from '@/shared/src/composables/use-plugins'
import { RouteLocationRaw } from 'vue-router'

import { pathToURL } from '@/front/src/router'

export function generateCanonicalBlock(to: RouteLocationRaw): {
  rel: string
  href: string
} {
  return {
    rel: 'canonical',
    href: pathToURL(decodeURIComponent(useRouter().resolve(to).href)),
  }
}
