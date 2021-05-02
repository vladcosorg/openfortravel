import type { LocaleMessageObject } from 'vue-i18n'

import type { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/models'
import type { MappedPlainRestrictionCollection } from '@/shared/src/api/restrictions/models'

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
}

export class RootState implements StateInterface {
  countrySelectorLoading = false
  detectedCountry = 'us'
  localizedRoutes = {}
  locales = {}
  localizedLanguages = {}
  serverLocale = 'en'
  availableLocales = []
  labeledLocales = []
  countryToContinentMap = {}
  hostRules: MappedPlainDestinationCollection = {}
  sharedRestrictions: {
    originCode?: string
    restrictions: MappedPlainRestrictionCollection
  } = { restrictions: {} }
}

export function state(): RootState {
  return new RootState()
}

export type RootStateType = ReturnType<typeof state>
