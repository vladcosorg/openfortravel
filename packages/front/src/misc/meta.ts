import { useMeta } from 'quasar'
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

function generateLdJsonBlock(
  rawLdJson: Record<string, unknown>,
): Record<string, string> {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify(rawLdJson),
  }
}

let jsonLdIndex = 0
export function useMetaJsonLd(rawLdJson: Record<string, unknown>) {
  useMeta(() => ({
    script: {
      [`ldjson${jsonLdIndex}`]: generateLdJsonBlock(rawLdJson),
    },
  }))
  jsonLdIndex++
}
