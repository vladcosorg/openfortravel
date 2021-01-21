import { useStore, useVueI18n } from '@/shared/src/composables/use-plugins'

export function getMappedContinentID(countryISO: string): string | undefined {
  return useStore().state.countryToContinentMap[countryISO]
}

export function getContinentList(
  prioritizeContinent?: string,
): Record<string, string> {
  const list: Record<string, string> = {}
  const { t } = useVueI18n()
  let orderedList = ['na', 'eu', 'as', 'sa', 'oc', 'af']
  if (prioritizeContinent) {
    orderedList = [
      prioritizeContinent,
      ...orderedList.filter((contId) => contId !== prioritizeContinent),
    ]
  }

  orderedList.forEach((id) => (list[id] = t(`misc.continents.${id}`) as string))
  return list
}
