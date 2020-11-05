import {
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
  watch,
  WritableComputedRef,
} from '@vue/composition-api'
import mapValues from 'lodash/mapValues'

import { Restriction } from 'src/api/restrictions/models'
import { useFilterableCollection } from 'src/composables/use-misc'
import { Loading, useLoading } from 'src/composables/use-promise-loading'
import { useProperVuexActionDispatcher, useVuexGetter } from 'src/composables/use-vuex'
import { GroupedDestinations } from 'src/pages/country/country-store'

type GroupedDestinationObjects = GroupedDestinations<Restriction>

export function useGroupedDestinations(
  originCodeRef: Ref<string>,
): {
  filterLoading: Ref<boolean>
  destinations: ComputedRef<GroupedDestinationObjects>
  filter: WritableComputedRef<string>
} & Loading {
  const { loading } = useLoading(false)
  const fetcher = useProperVuexActionDispatcher(
    'countryPage/fetchCountryDestinations',
    loading,
  )
  const { filter, collection, loading: filterLoading } = useFilterableCollection(
    useVuexGetter<GroupedDestinationObjects>('countryPage/getDestinationObjects'),
    (input, filterValue) => {
      return mapValues(input, (group) => {
        if (group === undefined) {
          return group
        }

        return group.filter((destinations) => {
          return destinations.destinationLabel.toLowerCase().includes(filterValue)
        })
      })
    },
  )

  onServerPrefetch(() => fetcher(originCodeRef.value))
  onMounted(() => fetcher(originCodeRef.value))
  watch(originCodeRef, fetcher)

  return {
    destinations: collection,
    loading,
    filter,
    filterLoading,
  }
}
