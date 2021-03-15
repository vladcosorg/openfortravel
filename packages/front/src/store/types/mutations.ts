import { LocaleMessageObject } from 'vue-i18n'

import { RootStateType, StateInterface } from '@/front/src/store/state'
import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/models'
import { MappedPlainRestrictionCollection } from '@/shared/src/api/restrictions/models'

export enum MutationTypes {
  setCountryToContinentMap = 'setCountryToContinentMap',
  setCountrySelectorLoading = 'setCountrySelectorLoading',
  setDetectedCountry = 'setDetectedCountry',
  setLocales = 'setLocales',
  setAvailableLocales = 'setAvailableLocales',
  setLabeledLocales = 'setLabeledLocales',
  setServerLocale = 'setServerLocale',
  setHostRules = 'setHostRules',
  setSharedRestrictions = 'setSharedRestrictions',
}

export type MutationSignatures<S = RootStateType> = {
  [MutationTypes.setCountryToContinentMap](state: S, map: Record<string, string>): void
  [MutationTypes.setCountrySelectorLoading](state: S, value: boolean): void
  [MutationTypes.setDetectedCountry](state: S, country: string): void
  [MutationTypes.setLocales](state: S, locales: LocaleMessageObject): void
  [MutationTypes.setAvailableLocales](state: S, locales: string[]): void
  [MutationTypes.setLabeledLocales](state: S, locales: StateInterface['labeledLocales']): void
  [MutationTypes.setServerLocale](state: S, serverLocale: string): void
  [MutationTypes.setHostRules](state: S, hostRules: MappedPlainDestinationCollection): void
  [MutationTypes.setSharedRestrictions](
    state: S,
    restrictions: {
      originCode: string
      restrictions: MappedPlainRestrictionCollection
    },
  ): void
}
