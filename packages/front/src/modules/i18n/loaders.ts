import type { LanguageLocale } from '@/front/src/modules/i18n/types'
import type { StateInterface } from '@/front/src/store/state'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'

import type { Store } from 'vuex'

export function pushRequiredLocalesToStore(
  i18n: ReturnType<typeof getI18nInstance>,
  currentLocale: LanguageLocale,
  store: Store<StateInterface>,
): void {
  store.commit('setLocales', {
    [currentLocale]: i18n.getLocaleMessage(currentLocale),
  })
}

export function preloadLocaleMessageCollectionIntoPlugin(
  i18n: ReturnType<typeof getI18nInstance>,
  localeMessageCollection: any,
): void {
  Object.entries(localeMessageCollection).map(([locale, messageObject]) =>
    i18n.setLocaleMessage(locale, messageObject),
  )
}
