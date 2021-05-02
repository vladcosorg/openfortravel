import type { RawLocation } from 'vue-router'

import { pathToURL } from '@/front/src/router'
import { useRouter } from '@/shared/src/composables/use-plugins'

export function generateCanonicalBlock(to: RawLocation): { rel: string; href: string } {
  return {
    rel: 'canonical',
    href: pathToURL(decodeURIComponent(useRouter().resolve(to).href)),
  }
}
