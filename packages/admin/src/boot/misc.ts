import { boot } from 'quasar/wrappers'
import VueI18n, { LocaleMessages } from 'vue-i18n'

import { setI18n } from '@/shared/src/composables/use-plugins'
import messages from '@/shared/src/i18n'
import { createVueI18n } from '@/shared/src/misc/i18n'
import { preloadCountryListForLocale } from '@/shared/src/modules/country-list/country-list-helpers'

export default boot(async ({ Vue }) => {
  await preloadCountryListForLocale('en')
  Vue.use(VueI18n)
  setI18n(createVueI18n((messages as unknown) as LocaleMessages))
})
