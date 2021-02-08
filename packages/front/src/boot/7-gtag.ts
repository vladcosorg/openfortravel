import { uid } from 'quasar'
import { boot } from 'quasar/wrappers'

import { useCookies } from '@/shared/src/composables/use-plugins'

export default boot(({ router }) => {
  if (process.env.PROD) {
    router.afterEach(async (to) => {
      logPage(to.path)
    })
  }
})

function logPage(path: string): void {
  // Here you can preprocess the path, if needed
  window.dataLayer.push({
    event: 'customPageView',
    path: path,
    cid: getCid(),
  })
}

function getCid() {
  const cookies = useCookies()
  if (!cookies.has('cid')) {
    cookies.set('cid', uid())
  }

  return cookies.get('cid')
}
