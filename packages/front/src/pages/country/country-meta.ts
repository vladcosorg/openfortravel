import { useRootStore, useVueI18n } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { useMeta } from 'quasar'
import { useRoute } from 'vue-router'

import { generateCanonicalBlock } from '@/front/src/misc/meta'

export function useOriginMeta(): void {
  const route = useRoute()
  useMeta(() => {
    if (route.name !== 'country') {
      return {}
    }

    const { t } = useVueI18n()
    const originCode = useRootStore().getters.visitorOrigin
    return {
      title: t('page.country.meta.title', {
        origin: getLabelForCountryCode(originCode),
      }),
      link: {
        canonical: generateCanonicalBlock({
          name: 'origin',
          params: {
            originSlug: transformCountryCodeToOriginSlug(originCode),
          },
        }),
      },
    }
  })
}
