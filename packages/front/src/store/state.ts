import type { LocaleMessageObject } from 'vue-i18n'

import type { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/models'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

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
  visitorContext: Partial<VisitorProfile>
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
  visitorContext: Partial<VisitorProfile> = {}
  // eslint-disable-next-line unicorn/no-null
  searchId = null as string | null
}

export function state(): RootState {
  return new RootState()
}

export type RootStateType = ReturnType<typeof state>
