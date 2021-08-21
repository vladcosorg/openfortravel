import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

import type { LocaleMessageObject } from 'vue-i18n'

export interface StateInterface {
  countrySelectorLoading: boolean
  detectedCountry: string | undefined
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
  locales = {}
  localizedLanguages = {}
  serverLocale = 'en'
  availableLocales = [] as string[]
  labeledLocales = {} as StateInterface['labeledLocales']
  countryToContinentMap = {}
  hostRules: MappedPlainDestinationCollection = {}
  visitorContext: Partial<VisitorProfile> = {}
  slugs: any
}

export function state(): RootState {
  return new RootState()
}

export type RootStateType = ReturnType<typeof state>
