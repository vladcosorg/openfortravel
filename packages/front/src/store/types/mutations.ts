import type { RootStateType, StateInterface } from '@/front/src/store/state'
import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'

import type { LocaleMessageObject } from 'vue-i18n'

export enum MutationTypes {
  setCountryToContinentMap = 'setCountryToContinentMap',
  setCountrySelectorLoading = 'setCountrySelectorLoading',

  setLocales = 'setLocales',
  setAvailableLocales = 'setAvailableLocales',
  setLabeledLocales = 'setLabeledLocales',
  setLocalizedLanguages = 'setLocalizedLanguages',
  setServerLocale = 'setServerLocale',
  setHostRules = 'setHostRules',

  mergeVisitorContext = 'mergeVisitorContext',
  replaceVisitorContext = 'replaceVisitorContext',
  setVisitorContextField = 'setVisitorContextField',
  setVisitorOrigin = 'setVisitorOrigin',
  setSlugs = 'setSlugs',
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

  [MutationTypes.mergeVisitorContext](
    state: S,
    payload: {
      context: Partial<ProfileContext>
      persistLocally: boolean
    },
  ): void

  [MutationTypes.replaceVisitorContext](
    state: S,
    payload: {
      context: ProfileContext
      persistLocally?: boolean
    },
  ): void

  [MutationTypes.setVisitorContextField]<
    K extends keyof ProfileContext,
    V extends ProfileContext[K],
  >(
    state: S,
    payload: {
      field: K
      value: V
    },
  ): void
  [MutationTypes.setVisitorOrigin](state: S, country: string): void
  [MutationTypes.setSlugs](state: S, slugs: any): void
}
