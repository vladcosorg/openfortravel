import { IVueI18n, LocaleMessageObject, LocaleMessages } from 'vue-i18n'
import { Store } from 'vuex'

import { fetchMessagesForLocale } from '@/front/src/modules/i18n/fetchers'
import { LanguageLocale } from '@/front/src/modules/i18n/types'
import { StateInterface } from '@/front/src/store'

export function pushRequiredLocalesToStore(
  i18n: IVueI18n,
  currentLocale: LanguageLocale,
  store: Store<StateInterface>,
): void {
  const fallbackLocale = i18n.fallbackLocale as LanguageLocale
  const ssrLocales: LocaleMessageObject = {
    [fallbackLocale]: i18n.getLocaleMessage(fallbackLocale),
  }

  const allLocales = i18n.messages
  if (currentLocale !== fallbackLocale && allLocales[currentLocale]) {
    ssrLocales[currentLocale] = i18n.getLocaleMessage(currentLocale)
  }
  store.commit('setLocales', ssrLocales)
}

export function preloadLocaleMessageCollectionIntoPlugin(
  i18n: IVueI18n,
  localeMessageCollection: LocaleMessages,
): void {
  Object.entries(localeMessageCollection).map(([locale, messageObject]) =>
    i18n.setLocaleMessage(locale, messageObject as LocaleMessageObject),
  )
}

export async function preloadLocaleIntoPluginOnDemand(
  locale: LanguageLocale,
  i18n: IVueI18n,
): Promise<void> {
  if (i18n.messages[locale]) {
    return
  }

  try {
    const localeMessages = await fetchMessagesForLocale(locale)
    i18n.setLocaleMessage(locale, localeMessages)
    // eslint-disable-next-line no-empty
  } catch {}
}
