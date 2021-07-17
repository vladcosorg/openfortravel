import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$isDev = process.env.DEV
})
