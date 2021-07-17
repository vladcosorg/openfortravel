import { computed, ComputedRef, Ref } from 'vue'

import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import {
  VaccineBrand,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

type Links = Array<{ url: string; title: string; label: string }>
export function useLinks(destinationIso: Ref<string>): ComputedRef<Links> {
  return computed(() => {
    const newLinks: Links = []

    for (const [id, label] of Object.entries(vaccineLabels)) {
      newLinks.push({
        title: `See travel restrictions for from {} to Bahams for travels vaccinated with ${label}`,
        label: `Vaccinated with ${label}`,
        url: getDestinationRouteURL({
          destinationSlug: destinationIso.value,
          vaccinated: {
            brand: id as VaccineBrand,
            partial: false,
          },
        }),
      })
    }

    return newLinks
  })
}
