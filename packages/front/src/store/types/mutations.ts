import type { LocaleMessageObject } from 'vue-i18n'

import type { RootStateType, StateInterface } from '@/front/src/store/state'
import type { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/models'
import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'

export enum MutationTypes {
  setCountryToContinentMap = 'setCountryToContinentMap',
  setCountrySelectorLoading = 'setCountrySelectorLoading',
  setDetectedCountry = 'setDetectedCountry',
  setLocales = 'setLocales',
  setAvailableLocales = 'setAvailableLocales',
  setLabeledLocales = 'setLabeledLocales',
  setLocalizedLanguages = 'setLocalizedLanguages',
  setServerLocale = 'setServerLocale',
  setHostRules = 'setHostRules',
  setVisitorContext = 'setVisitorContext',
  setVisitorContextField = 'setVisitorContextField',
}

export type MutationSignatures<S = RootStateType> = {
  [MutationTypes.setCountryToContinentMap](
    state: S,
    map: Record<string, string>,
  ): void
  [MutationTypes.setLocalizedLanguages](
    state: S,
    languages: Record<string, string>,
  ): void
  [MutationTypes.setCountrySelectorLoading](state: S, value: boolean): void
  [MutationTypes.setDetectedCountry](state: S, country: string): void
  [MutationTypes.setLocales](state: S, locales: LocaleMessageObject): void
  [MutationTypes.setAvailableLocales](state: S, locales: string[]): void
  [MutationTypes.setLabeledLocales](
    state: S,
    locales: StateInterface['labeledLocales'],
  ): void
  [MutationTypes.setServerLocale](state: S, serverLocale: string): void
  [MutationTypes.setHostRules](
    state: S,
    hostRules: MappedPlainDestinationCollection,
  ): void
  [MutationTypes.setVisitorContextField]<
    K extends keyof VisitorContextType,
    V extends VisitorContextType[K]
  >(
    state: S,
    payload: {
      field: K
      value: V
    },
  ): void
  [MutationTypes.setVisitorContext](
    state: S,
    payload: {
      context: VisitorContextType
      persist: boolean
    },
  ): void
}
