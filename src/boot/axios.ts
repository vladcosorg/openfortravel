import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}
export const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/',
})
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axiosAPI
})
