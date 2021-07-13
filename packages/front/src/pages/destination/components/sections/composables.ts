import { computed, ComputedRef, inject } from '@vue/composition-api'

import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { generateDestinationRoute } from '@/front/src/router/factory'
import {
  VaccineBrand,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Links = Array<{ url: Promise<string>; title: string; label: string }>
export function useLinks(): ComputedRef<Links> {
  const store = inject(StoreKey) as StoreModule
  return computed(() => {
    const destinationIso = store.state.currentDestinationCode
    const newLinks: Links = []

    for (const [id, label] of Object.entries(vaccineLabels)) {
      newLinks.push({
        title: `See restrictions for from {} to Bahams for travels vaccinated with ${label}`,
        label: `Restrictions for travellers vaccinated with ${label}`,
        url: generateDestinationRoute({
          destinationCode: destinationIso,
          contextOverrides: {
            [RestrictionNodeType.VACCINATED]: {
              partial: false,
              brand: id as VaccineBrand,
            },
          },
        }),
      })
    }

    return newLinks
  })
}
