import type { IVueI18n, LocaleMessageObject, LocaleMessages } from 'vue-i18n'
import type { Store } from 'vuex'

import type { LanguageLocale } from '@/front/src/modules/i18n/types'
import type { StateInterface } from '@/front/src/store/state'

export function pushRequiredLocalesToStore(
  i18n: IVueI18n,
  currentLocale: LanguageLocale,
  store: Store<StateInterface>,
): void {
  const ssrLocales: LocaleMessageObject = {
    [currentLocale]: i18n.getLocaleMessage(currentLocale),
  }
  store.commit('setLocales', ssrLocales)
}

export function preloadLocaleMessageCollectionIntoPlugin(
  i18n: IVueI18n,
  localeMessageCollection: LocaleMessages,
): void {
  Object.entries(localeMessageCollection).map(([locale, messageObject]) =>
    i18n.setLocaleMessage(locale, messageObject),
  )
}
