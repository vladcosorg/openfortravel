import { boot } from 'quasar/wrappers'
import { IVueI18n } from 'vue-i18n'

import { useStore } from 'src/composables/use-plugins'

export default boot(async ({ app, ssrContext }) => {
  ;(app.i18n as IVueI18n).vm.$watch(
    'locale',
    (currentLocale: string) => {
      useStore().dispatch(
        'modules/countryList/fetchCountryList',
        currentLocale.split('-')[0],
      )
    },
    { immediate: !!ssrContext },
  )
})
