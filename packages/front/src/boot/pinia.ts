import { QSsrContext } from '@quasar/app'
import { createPinia, Pinia } from 'pinia'
import { boot } from 'quasar/wrappers'

export let pinia: Pinia
export default boot(({ app, ssrContext }) => {
  pinia = createPinia()
  app.use(pinia)

  if (ssrContext) {
    ;(ssrContext as QSsrContext & { pinia: () => string }).pinia = () =>
      JSON.stringify(pinia.state.value)
  } else {
    pinia.state.value = window.__PINIA_INITIAL_STATE__
  }
})

export function usePinia(): Pinia {
  return pinia
}
