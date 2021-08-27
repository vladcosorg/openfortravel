import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'
import { defineStore } from 'pinia'

import { usePiniaRootStore } from '@/front/src/store/pinia-root-store'
import { fetchOverview } from '@/shared/src/api/function-api/overview'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { riskLevel } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { createRoundTripCollectionFromRawRestrictions } from '@/shared/src/models/trip/factory'
import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'

const groups = ['forbidden', 'quarantine', 'test', 'open'] as const
type GroupedDestinations = {
  [key in typeof groups[number]]: RoundTripCollection | undefined
}
export const useCountryStore = defineStore('country', {
  state: () => ({
    sortBy: Object.keys(sorters)[0] as SearchSortOption,
    continentFilter: undefined as string | undefined,
    plainRestrictions: undefined as
      | [ProfileContext, RoundTripRawPrecomputedRestrictionMap]
      | undefined,
  }),
  getters: {
    currentCountryCode: () =>
      useRootStore().getters.visitorContextWithDefaults.origin!,
    searchResults: (state) => {
      if (!state.plainRestrictions) {
        return []
      }
      const rootStore = usePiniaRootStore()
      const allResults = createRoundTripCollectionFromRawRestrictions(
        useRootStore().getters.visitorContextWithDefaults.origin,
        state.plainRestrictions ? state.plainRestrictions[1] : {},
        rootStore.countryFactsheets,
      )

      return sorters[state.sortBy](allResults)
    },
    groupedResults(state) {
      const allDestinations: RoundTripCollection = state.continentFilter
        ? this.searchResults.filter(
            (trip) =>
              trip.outgoing.destination.continent === state.continentFilter,
          )
        : this.searchResults

      return Object.assign(
        Object.fromEntries(groups.map((group) => [group, undefined])),
        groupBy(allDestinations, (roundTrip) => {
          if (roundTrip.outgoing.restrictions.isForbidden) {
            return 'forbidden'
          }

          if (roundTrip.outgoing.restrictions.quarantine) {
            return 'quarantine'
          }

          if (roundTrip.outgoing.restrictions.pcrTest) {
            return 'test'
          }

          return 'open'
        }) as unknown as GroupedDestinations,
      ) as GroupedDestinations
    },
  },
  actions: {
    async fetchAll() {
      const context = useRootStore().getters.visitorContextWithDefaults
      await usePiniaRootStore().fetchAllFactsheets()
      if (
        this.plainRestrictions &&
        isEqual(this.plainRestrictions[0], context)
      ) {
        return
      }

      this.plainRestrictions = undefined

      this.plainRestrictions = [
        context,
        await fetchOverview(useRootStore().getters.visitorContextWithDefaults),
      ]
    },
  },
})

function createSorters<
  T extends Record<
    string,
    (collection: RoundTripCollection) => RoundTripCollection
  >,
>(sorters: T) {
  return sorters
}

export const sorters = createSorters({
  risk: (collection) =>
    collection.sort(
      (a, b) =>
        riskLevel.indexOf(a.outgoing.destination.riskLevel) -
        riskLevel.indexOf(b.outgoing.destination.riskLevel),
    ),
  alphabet: (collection) => collection,
})

export type SearchSortOption = keyof typeof sorters
