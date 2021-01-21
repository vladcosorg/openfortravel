import { generateCanonicalBlock } from '@/front/src/misc/meta'
import { useI18n } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCodeToDestinationSlug,
  transformCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function meta({
  originCode,
  destinationCode,
  isFallback,
}: {
  originCode: string
  destinationCode: string
  isFallback: boolean
}): unknown {
  return {
    title: useI18n().t('page.destination.meta.title', {
      origin: getLabelForCountryCode(originCode),
      destination: getLabelForCountryCode(destinationCode),
    }),
    link: {
      ...(isFallback && {
        canonical: generateCanonicalBlock({
          name: 'destination',
          params: {
            originSlug: transformCodeToOriginSlug(originCode),
            destinationSlug: transformCodeToDestinationSlug(originCode),
          },
        }),
      }),
    },
  }
}
