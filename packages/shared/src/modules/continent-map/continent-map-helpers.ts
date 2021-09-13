import { useStore, useVueI18n } from '@/shared/src/composables/use-plugins'
import { Continent, continents } from '@/shared/src/modules/continent-map/types'

export function getMappedContinentID(countryISO: string): Continent {
  const result = useStore().state.countryToContinentMap[countryISO]
  if (!result) {
    throw new Error(`Cannot find continent for ${countryISO}`)
  }

  return result
}

export function getOrderedListOfContinentIDs(): typeof continents {
  return continents
}

export function getContinentList(
  prioritizeContinent?: string,
): Record<string, string> {
  const list: Record<string, string> = {}

  let orderedList
  if (prioritizeContinent) {
    orderedList = [
      prioritizeContinent,
      ...getOrderedListOfContinentIDs().filter(
        (contId) => contId !== prioritizeContinent,
      ),
    ]
  }

  for (const id of orderedList) {
    list[id] = getContinentLabel(id)
  }
  return list
}

export function getContinentLabel(continentID: string): string {
  const { t } = useVueI18n()
  return t(`misc.continents.${continentID}`)
}
