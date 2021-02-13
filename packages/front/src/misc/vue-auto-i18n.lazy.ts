import {
  CacheType,
  integrateWithVueI18n,
  ManualTranslator,
  TranslationService,
} from 'vue-auto-i18n'
import type { IVueI18n, Locale, LocaleMessageObject } from 'vue-i18n'

import { useSharedCache } from '@/shared/src/composables/use-plugins'

export function createAutoI18n(i18nPluginInstance: IVueI18n): ManualTranslator {
  return integrateWithVueI18n({
    i18nPluginInstance,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sourceLanguage: 'en',
    automatic: true,
    cache: (useSharedCache() as unknown) as CacheType,
    translationService: new SSRProxy(),
    blacklistedPaths: [
      'page.country.route',
      'page.destination.route',
      'page.index.route',
    ],
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
