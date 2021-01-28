import Vue from 'vue'
import {
  integrateWithVueI18n,
  TranslationService,
  ManualTranslator,
} from 'vue-auto-i18n'
import VueI18n, {
  IVueI18n,
  Locale,
  LocaleMessageObject,
  LocaleMessages,
} from 'vue-i18n'

import { useEventBus } from '@/shared/src/composables/use-plugins'

export function createVueI18n(messages?: LocaleMessages): IVueI18n {
  Vue.use(VueI18n)
  return (new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  }) as unknown) as IVueI18n
}

export function createAutoI18n(i18n: IVueI18n): ManualTranslator {
  return integrateWithVueI18n({
    i18nPluginInstance: i18n,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sourceLanguage: 'en',
    automatic: true,
    translationService: process.env.CLIENT ? new SSRProxy() : undefined,
    blacklistedPaths: [
      'page.country.route',
      'page.destination.route',
      'page.index.route',
    ],
    onReady() {
      useEventBus().$emit('translation-ready')
    },
  })
}

class SSRProxy implements TranslationService {
  async translate(targetLanguage: Locale): Promise<LocaleMessageObject> {
    const response = await fetch(
      `${process.env.PROJECT_URL}/translate?` +
        new URLSearchParams({
          targetLanguage,
        }),
      { method: 'POST' },
    )
    return await response.json()
  }
}
