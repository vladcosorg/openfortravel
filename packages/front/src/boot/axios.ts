import { Notify } from 'quasar'

import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}
export const axiosAPI = axios.create({
  baseURL: process.env.PROJECT_URL,
})
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axiosAPI
  axiosAPI.interceptors.response.use(
    (response) => response,
    (error) => {
      Notify.create({
        icon: 'error',
        color: 'negative',
        message: 'An error occured. Please try again later.',
      })
      throw error
    },
  )
})
