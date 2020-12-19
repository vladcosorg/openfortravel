import { pathToURL } from '@/front/src/router'
import { useRouter } from '@/shared/src/composables/use-plugins'
import { RawLocation } from 'vue-router'

export function generateCanonicalBlock(
  to: RawLocation,
): { rel: string; href: string } {
  return {
    rel: 'canonical',
    href: pathToURL(decodeURIComponent(useRouter().resolve(to).href)),
  }
}
