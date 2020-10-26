import { Ref } from '@vue/composition-api'
import keyBy from 'lodash/keyBy'

import {
  DummyPlainOrigin,
  getOrigin,
  getOrigins,
  PlainOrigin,
  updateOriginField,
} from 'src/api/origin'
import { useAsyncState } from 'src/composables/use-async'
import { getCountryCodes } from 'src/misc/i18n-country-list'
import { Origin } from 'src/models/origin'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useOrigin(originCode: string, defaultState: PlainOrigin) {
  const { state, loading } = useAsyncState(getOrigin(originCode), defaultState)

  const updateField = async <
    K extends keyof PlainOrigin,
    V extends PlainOrigin[K]
  >(
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

export function useOrigins(): {
  list: Ref<Origin[]>
  ready: Ref<boolean>
} {
  const promise = generateOriginList()
  const { state, ready } = useAsyncState(promise, [], { freeze: true })

  return { list: state, ready }
}

async function generateOriginList(): Promise<Origin[]> {
  const origins = keyBy(await getOrigins(), (origin) => origin.countryCode)
  const allCountryCodes = getCountryCodes()
  return allCountryCodes.map((countryCode) => {
    let origin = origins[countryCode]
    if (!origin) {
      origin = new DummyPlainOrigin(countryCode)
    }

    return new Origin(origin)
  })
}
