import { boot } from 'quasar/wrappers'
import VueCompositionApi from 'vue'

export default boot(({ Vue }) => {
  Vue.use(VueCompositionApi)
})
