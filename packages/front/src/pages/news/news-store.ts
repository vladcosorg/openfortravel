import { pickBy } from 'lodash'
import isEqual from 'lodash/isEqual'
import mapValues from 'lodash/mapValues'
import { defineStore } from 'pinia'

import { verbaliseOverview } from '@/front/src/modules/verbaliser/overview'
import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { usePiniaRootStore } from '@/front/src/store/pinia-root-store'
import { fetchRawOverview } from '@/shared/src/api/function-api/overview-raw'
import { RoundTripEncodedRestriction } from '@/shared/src/api/function-api/overview-raw/model'
import { createOverviewCollection } from '@/shared/src/api/function-api/overview/helpers'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RiskLevel } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { createProfileContext } from '@/shared/src/models/profile-context/helper'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { getMappedContinentID } from '@/shared/src/modules/continent-map/continent-map-helpers'
import { Continent, continents } from '@/shared/src/modules/continent-map/types'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  getVaccineIds,
  VaccineBrand,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Destinations = Array<{
  url: string
  riskLevel: RiskLevel
  destinationLabel: string
  destinationISO: string
  renderer: any
}>
export type GroupedDestinations<T = Destinations> = {
  allowed: Partial<Record<Continent, T>>
  conditional: Partial<Record<Continent, T>>
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    content: undefined as
      | [ProfileContext, Record<string, RoundTripEncodedRestriction>]
      | undefined,
  }),
  getters: {
    localContext() {
      return createProfileContext({
        [RestrictionNodeType.ORIGIN]: useRootStore().getters.visitorOrigin,
        [RestrictionNodeType.VACCINATED]: {
          partial: false,
          brand: getVaccineIds(),
        },
      })
    },
    sortedCountryList(state): GroupedDestinations {
      const out = {
        allowed: Object.fromEntries<Destinations>(
          continents.map((continent) => [continent, []]),
        ) as Record<Continent, Destinations>,
        conditional: Object.fromEntries<Destinations>(
          continents.map((continent) => [continent, []]),
        ) as Record<Continent, Destinations>,
      }

      if (!state.content) {
        return out
      }

      const factsheets = usePiniaRootStore().countryFactsheets
      const collection = createOverviewCollection(state.content[1])
      for (const [destinationISO, destination] of Object.entries(collection)) {
        if (destination.outgoing.isForbidden) {
          continue
        }

        const url = getUrl(destinationISO)
        out[destination.outgoing.isAllowed ? 'allowed' : 'conditional'][
          getMappedContinentID(destinationISO)
        ].push({
          url,
          destinationISO,
          destinationLabel: getLabelForCountryCode(destinationISO),
          riskLevel: factsheets[destinationISO].riskLevel,
          renderer: verbaliseOverview(
            this.localContext,
            destinationISO,
            url,
            destination,
          ),
        })
      }

      return mapValues(out, (group) =>
        mapValues(
          pickBy(group, (continents) => continents.length),
          (continent) =>
            continent.sort((a, b) =>
              a.destinationLabel.localeCompare(b.destinationLabel),
            ),
        ),
      )
    },
  },
  actions: {
    async fetchData() {
      await usePiniaRootStore().fetchAllFactsheets()
      if (this.content && isEqual(this.localContext, this.content[0])) {
        return
      }

      this.content = [
        this.localContext,
        await fetchRawOverview(this.localContext),
      ]
    },
  },
})

const getUrl = (destinationISO: string) =>
  getDestinationRouteURL({
    destinationSlug: destinationISO,
    vaccinated: {
      partial: false,
      brand: VaccineBrand.PFIZER,
    },
  })
