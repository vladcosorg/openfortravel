import { Ref } from '@vue/composition-api'
import keyBy from 'lodash/keyBy'

import {
  createDummyDestination,
  createDummyPlainDestination,
  wrapCollectionWithRichObject,
} from 'src/api/destinations/helper'
import { Destination, PlainDestination } from 'src/api/destinations/models'
import {
  findOriginAsRichObject,
  findOrigins,
  updateOriginField,
} from 'src/api/destinations/repository'
import { useAsyncState } from 'src/composables/use-async'
import { getCountryCodes } from 'src/modules/country-list/country-list-helpers'

type UpdateFunc = <
  K extends keyof PlainDestination,
  V extends PlainDestination[K]
>(
  field: K,
  value: V,
) => Promise<void>

export function useDestination(
  originCode: string,
): {
  destinationRef: Ref<Destination>
  updateField: UpdateFunc
  loadingRef: Ref<boolean>
} {
  const destination = useAsyncState(
    findOriginAsRichObject(originCode),
    createDummyDestination(),
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
  const allCountryCodes = getCountryCodes()
  const allOrigins = allCountryCodes.map(
    (countryCode) =>
      origins[countryCode] ??
      createDummyPlainDestination({ countryCode: countryCode }),
  )

  return wrapCollectionWithRichObject(allOrigins)
}
