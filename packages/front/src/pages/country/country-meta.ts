import { generateCanonicalBlock } from '@/front/src/misc/meta'
import { useI18n } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function meta({
  originCode,
  isFallback,
}: {
  originCode: string
  isFallback: boolean
}): unknown {
  return {
    title: useI18n().t('page.country.meta.title', {
      origin: getLabelForCountryCode(originCode),
    }),
    link: {
      ...(isFallback && {
        canonical: generateCanonicalBlock({
          name: 'origin',
          params: {
            originSlug: transformCountryCodeToOriginSlug(originCode),
          },
        }),
      }),
    },
  }
}
