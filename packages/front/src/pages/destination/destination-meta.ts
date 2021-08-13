import { useRootStore, useVueI18n } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { useMeta } from 'quasar'
import { useRoute } from 'vue-router'

import { generateCanonicalBlock } from '@/front/src/misc/meta'
import { StoreModule } from '@/front/src/pages/destination/destination-store'

export function useDestinationMeta(store: StoreModule): void {
  const route = useRoute()
  useMeta(() => {
    if (route.name !== 'destination') {
      return {}
    }

    const originIso = useRootStore().getters.visitorOrigin
    const destinationIso = store.getters.currentDestinationCode
    const { t } = useVueI18n()

    return {
      title: t('page.destination.meta.title', {
        origin: getLabelForCountryCode(originIso),
        destination: getLabelForCountryCode(destinationIso),
      }),
      link: {
        canonical: generateCanonicalBlock({
          name: 'destination',
          params: {
            originSlug: transformCountryCodeToOriginSlug(originIso),
            destinationSlug: transformCountryCodeToDestinationSlug(originIso),
          },
        }),
      },
    }
  })
}
