import { ref, Ref } from '@vue/composition-api'
import {
  Destination,
  saveCountryDestination,
  updateAllCountryDestinations,
} from 'src/api/Destinations'
import { useAsyncState } from 'src/composables/use-async'
import { generateDestinationList } from 'src/repositories/CountryDestinations'

type PersistAllFunc = <K extends keyof Destination>(
  field: K,
  value: Destination[K],
) => Promise<void>

type PersistOneFunc = <K extends keyof Destination>(
  field: K,
  value: Destination[K],
  destinationISO: string,
) => Promise<void>

export function useOriginDestinations(
  originCode: string,
): {
  list: Ref<Destination[]>
  loading: Ref<boolean>
  persistOneFieldValue: PersistOneFunc
  persistAllFieldValues: PersistAllFunc
} {
  const promise = generateDestinationList(originCode)
  const list = ref<Destination[]>([])
  const { ready: loading } = useAsyncState(promise, [])

  void promise.then((destinations) => {
    list.value = destinations
      .map((plainDestination) => new Destination(plainDestination))
      .sort((a, b) => a.countryLabel.localeCompare(b.countryLabel))
  })

  const persistOneFieldValue: PersistOneFunc = async (
    field,
    value,
    destinationISO,
  ) => {
    list.value
      .filter((destination) => destination.countryCode === destinationISO)
      .map((destination) => (destination[field] = value))
    return saveCountryDestination(
      { [field]: value },
      originCode,
      destinationISO,
    )
  }

  const persistAllFieldValues: PersistAllFunc = async (field, value) => {
    list.value.map((destination) => (destination[field] = value))
    await updateAllCountryDestinations({ [field]: value }, originCode)
  }

  return {
    loading,
    list,
    persistOneFieldValue,
    persistAllFieldValues,
  }
}
