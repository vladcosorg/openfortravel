import { useStore, useVueI18n } from '@/shared/src/composables/use-plugins'

export function getMappedContinentID(countryISO: string): string | undefined {
  return useStore().state.countryToContinentMap[countryISO]
}

export function getOrderedListOfContinentIDs(): string[] {
  return ['na', 'eu', 'as', 'sa', 'oc', 'af']
}

export function getContinentList(
  prioritizeContinent?: string,
): Record<string, string> {
  const list: Record<string, string> = {}

  let orderedList = getOrderedListOfContinentIDs()
  if (prioritizeContinent) {
    orderedList = [
      prioritizeContinent,
      ...orderedList.filter((contId) => contId !== prioritizeContinent),
    ]
  }

  orderedList.forEach((id) => (list[id] = getContinentLabel(id)))
  return list
}

export function getContinentLabel(continentID: string): string {
  const { t } = useVueI18n()
  return t(`misc.continents.${continentID}`) as string
}
