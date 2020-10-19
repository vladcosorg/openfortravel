import { Ref, ref } from '@vue/composition-api'
import {
  Destination,
  PlainDestination,
  saveCountryDestination,
} from 'src/api/Destinations'
import { useAsyncState } from 'src/composables/use-async'
import { generateDestinationList } from 'src/repositories/CountryDestinations'

export function useDestinationList(originCode: string) {
  const promise = generateDestinationList(originCode)
  const { state, ready } = useAsyncState(promise, [])

  void promise.then((list) => {
    state.value = list
      .map((plainDestination) => new Destination(plainDestination))
      .slice(0, 1)
  })

  async function saveValue<
    K extends keyof PlainDestination,
    V extends PlainDestination[K]
  >(field: K, value: V, destinationISO: string): Promise<void> {
    return saveCountryDestination(
      { [field]: value },
      originCode,
      destinationISO,
    )
  }

  return {
    ready,
    state,
    saveValue,
  }
}
