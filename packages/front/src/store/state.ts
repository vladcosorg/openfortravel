import type { LocaleMessageObject } from 'vue-i18n'

import type { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/models'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'

export interface StateInterface {
  countrySelectorLoading: boolean
  detectedCountry: string | undefined
  localizedRoutes: Record<string, string>
  localizedLanguages: Record<string, string>
  locales: LocaleMessageObject
  serverLocale: string
  availableLocales: string[]
  labeledLocales: Array<Record<string, string>>
  countryToContinentMap: Record<string, string>
  hostRules: MappedPlainDestinationCollection
  visitorContext: VisitorContextType
}

export class RootState implements StateInterface {
  countrySelectorLoading = false
  detectedCountry = 'us'
  localizedRoutes = {}
  locales = {}
  localizedLanguages = {}
  serverLocale = 'en'
  availableLocales = [] as string[]
  labeledLocales = {} as StateInterface['labeledLocales']
  countryToContinentMap = {}
  hostRules: MappedPlainDestinationCollection = {}
  visitorContext = {
    [RestrictionNodeType.ORIGIN]: 'us',
    [RestrictionNodeType.RECOVERY]: undefined,
    [RestrictionNodeType.VACCINATED]: undefined,
    [RestrictionNodeType.CITIZENSHIP]: [],
    [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
  }
}

export function state(): RootState {
  return new RootState()
}

export type RootStateType = ReturnType<typeof state>
