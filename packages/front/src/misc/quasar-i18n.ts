import { QSsrContext } from '@quasar/app'
import { Quasar } from 'quasar'

export async function preloadQuasarLocale(
  locale: string,
  ssrContext: QSsrContext,
): Promise<void> {
  let translations: { default: { isoName: string } }
  try {
    // eslint-disable-next-line import/dynamic-import-chunkname
    translations = await import(
      /* webpackChunkName: "quasar-lang-[request]" */
      'quasar/lang/' + locale
    )
  } catch {
    // eslint-disable-next-line import/dynamic-import-chunkname
    translations = await import(
      /* webpackChunkName: "quasar-lang-[request]" */
      'quasar/lang/en-us.js'
    )
    translations.default.isoName = locale
  }

  Quasar.lang.set(translations.default, ssrContext)
}
