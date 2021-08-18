import { RouteLocationRaw } from 'vue-router'

import { convertRelativeToAbsoluteURL } from '@/front/src/router'
import { useRouter } from '@/shared/src/composables/use-plugins'

export function generateCanonicalBlock(to: RouteLocationRaw): {
  rel: string
  href: string
} {
  return {
    rel: 'canonical',
    href: convertRelativeToAbsoluteURL(
      decodeURIComponent(useRouter().resolve(to).href),
    ),
  }
}
