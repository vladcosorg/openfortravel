import { boot } from 'quasar/wrappers'

import { serverCache } from '@/front/src/misc/server-cache'
import {
  autoTranslateIfNecessary,
  extractCurrentLocale,
  localeChangeHandler,
  setLocale,
} from '@/front/src/modules/i18n/boot'
import {
  preloadLocaleMessageCollectionIntoPlugin,
  pushRequiredLocalesToStore,
} from '@/front/src/modules/i18n/loaders'
import { setI18nInstance } from '@/shared/src/composables/use-plugins'
import { createVueI18n } from '@/shared/src/misc/i18n'

export default boot(async ({ app, store, ssrContext, redirect, router }) => {
  const i18nPlugin = createVueI18n(serverCache.i18nMessages)
  app.use(i18nPlugin)

  const i18n = i18nPlugin.global

  const isClient = !ssrContext

  setI18nInstance(i18n)

  // return
  if (isClient) {
    preloadLocaleMessageCollectionIntoPlugin(i18n, store.state.locales)
  }

  const currentLocale = extractCurrentLocale(store, ssrContext)
  setLocale(currentLocale)

  if (ssrContext) {
    store.commit('setServerLocale', currentLocale)

    let url
    if ((url = localeChangeHandler(currentLocale, router, ssrContext))) {
      redirect(url)
    }

    await autoTranslateIfNecessary(currentLocale, i18nPlugin.global)
    pushRequiredLocalesToStore(i18n, currentLocale, store)
  }
})
