import { boot } from 'quasar/wrappers'

import { useStore } from '@/shared/src/composables/use-plugins'

export default boot(async () => {
  await useStore().dispatch('modules/countryList/fetchCountryList', 'en')
})
