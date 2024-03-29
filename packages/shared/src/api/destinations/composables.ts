import keyBy from 'lodash/keyBy'

import {
  createDummyDestination,
  createDummyPlainDestination,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/destinations/helper'
import type { Destination } from '@/shared/src/api/destinations/models'
import { PlainDestination } from '@/shared/src/api/destinations/plain-destination'
import {
  findOriginAsRichObject,
  findOrigins,
  updateOriginField,
} from '@/shared/src/api/destinations/repository'
import { useAsyncState } from '@/shared/src/composables/use-async'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'

import type { Ref } from 'vue'

type UpdateFunc = <
  K extends keyof PlainDestination,
  V extends PlainDestination[K],
>(
  field: K,
  value: V,
) => Promise<void>

export function useDestination(originCode: string): {
  destinationRef: Ref<Destination>
  updateField: UpdateFunc
  loadingRef: Ref<boolean>
} {
  const destination = useAsyncState(
    findOriginAsRichObject(originCode),
    createDummyDestination(originCode),
  )

  const updateField: UpdateFunc = async (field, value) => {
    destination.state.value = destination.state.value.cloneWithFields({
      [field]: value,
    })
    destination.loading.value = true
    await updateOriginField(originCode, field, value)
    destination.loading.value = false
  }

  return {
    destinationRef: destination.state,
    updateField,
    loadingRef: destination.loading,
  }
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
  const origins = keyBy(await findOrigins(), (origin) => origin.countryCode)
  const allCountryCodes = getCountryISOCodes()

  const allOrigins = allCountryCodes.map(
    (countryCode) =>
      origins[countryCode] ?? createDummyPlainDestination(countryCode),
  )

  return wrapCollectionWithRichObject(allOrigins)
}
