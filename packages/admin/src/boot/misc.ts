import enCountryList from 'i18n-iso-countries/langs/en.json'
import { boot } from 'quasar/wrappers'
import type { LocaleMessages } from 'vue-i18n'
import VueI18n from 'vue-i18n'

import { setI18n } from '@/shared/src/composables/use-plugins'
import messages from '@/shared/src/i18n/index'
import { createVueI18n } from '@/shared/src/misc/i18n'
import type { RawLocalizedCountryList } from '@/shared/src/modules/country-list/country-list-node-preload'
import {
  createCountryListEntry,
  createSlugListEntry,
} from '@/shared/src/modules/country-list/country-list-node-preload'

export default boot(async ({ Vue, store }) => {
  Vue.use(VueI18n)
  setI18n(createVueI18n(messages as unknown as LocaleMessages))

  // store.commit('setAvailableLocales', ['en'])
  // store.commit('setCountryToContinentMap', loadContinentMap())
  // store.commit('setLabeledLocales', [])
  const countryList = createCountryListEntry(
    enCountryList as unknown as RawLocalizedCountryList,
  )

  store.commit('modules/countryList/setCountryList', countryList.origin)

  store.commit(
    'modules/countryList/setSlugMap',
    createSlugListEntry(countryList).origin,
  )
})
