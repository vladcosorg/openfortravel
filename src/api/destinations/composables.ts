import { Ref } from '@vue/composition-api'
import keyBy from 'lodash/keyBy'

import {
  createDummyPlainDestination,
  wrapCollectionWithRichObject,
} from 'src/api/destinations/helper'
import { Destination, PlainDestination } from 'src/api/destinations/models'
import { getOrigin, getOrigins, updateOriginField } from 'src/api/destinations/repository'
import { useAsyncState } from 'src/composables/use-async'
import { getCountryCodes } from 'src/misc/country-list'

export function useDestination(originCode: string, defaultState: PlainDestination) {
  const { state, loading } = useAsyncState(getOrigin(originCode), defaultState)

  const updateField = async <K extends keyof PlainDestination, V extends PlainDestination[K]>(
    field: K,
    value: V,
  ) => {
    state.value[field] = value
    loading.value = true
    await updateOriginField(originCode, field, value)
    loading.value = false
  }

  return { state, updateField, loading }
}

export function useDestinations(): {
  list: Ref<Destination[]>
  ready: Ref<boolean>
} {
  const promise = generateOriginList()
  const { state, ready } = useAsyncState(promise, [], { freeze: true })

  return { list: state, ready }
}

async function generateOriginList(): Promise<Destination[]> {
  const origins = keyBy(await getOrigins(), (origin) => origin.countryCode)
  const allCountryCodes = getCountryCodes()
  const allOrigins = allCountryCodes.map(
    (countryCode) =>
      origins[countryCode] ?? createDummyPlainDestination({ countryCode: countryCode }),
  )

  return wrapCollectionWithRichObject(allOrigins)
}
