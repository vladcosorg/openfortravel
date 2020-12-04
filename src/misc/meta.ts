import { RawLocation } from 'vue-router'

import { useRouter } from 'src/composables/use-plugins'
import { pathToURL } from 'src/router'

export function generateCanonicalBlock(
  to: RawLocation,
): { rel: string; href: string } {
  return {
    rel: 'canonical',
    href: pathToURL(decodeURIComponent(useRouter().resolve(to).href)),
  }
}
