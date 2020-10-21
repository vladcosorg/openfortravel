import { ref } from '@vue/composition-api'
import keyBy from 'lodash/keyBy'
import {
  DummyPlainOrigin,
  getOrigin,
  getOrigins,
  PlainOrigin,
  updateOriginField,
} from 'src/api/Origin'
import { useAsyncState } from 'src/composables/use-async'
import { getCountryCodes } from 'src/misc/I18nCountryList'
import { Origin } from 'src/models/Origin'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useOrigin(originCode: string, defaultState: PlainOrigin) {
  const loading = ref(true)
  const promise = getOrigin(originCode)
  const { state, ready } = useAsyncState(promise, defaultState)

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

  void promise.then(() => (loading.value = false))

  return { ready, state, updateField, loading }
}

export function useOrigins() {
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
