import { useI18n } from '@/shared/src/composables/use-plugins'
import type { Store } from 'vuex'

import type { LanguageLocale } from '@/front/src/modules/i18n/types'
import type { StateInterface } from '@/front/src/store/state'

export function pushRequiredLocalesToStore(
  i18n: ReturnType<typeof useI18n>,
  currentLocale: LanguageLocale,
  store: Store<StateInterface>,
): void {
  store.commit('setLocales', {
    [currentLocale]: i18n.getLocaleMessage(currentLocale),
  })
}

export function preloadLocaleMessageCollectionIntoPlugin(
  i18n: ReturnType<typeof useI18n>,
  localeMessageCollection: any,
): void {
  Object.entries(localeMessageCollection).map(([locale, messageObject]) =>
    i18n.setLocaleMessage(locale, messageObject),
  )
}
