import { boot } from 'quasar/wrappers'

import { setVueI18n, useStore } from '@/shared/src/composables/use-plugins'
import { createVueI18n } from '@/shared/src/misc/i18n'
import messages from '@/shared/src/i18n'
import VueI18n from 'vue-i18n'
export default boot(async ({ Vue }) => {
  await useStore().dispatch('modules/countryList/fetchCountryList', 'en')
  Vue.use(VueI18n)
  setVueI18n(createVueI18n(messages))
})
