import { matDone } from '@quasar/extras/material-icons'
import { Ref, ref } from '@vue/composition-api'
import { Notify } from 'quasar'

import { useI18n, useKy } from '@/shared/src/composables/use-plugins'

export function useRequestDispatcher(): {
  isLoading: Ref<boolean>
  isSubscribed: Ref<boolean>
  sendRequest: (
    email: string,
    originCode: string,
    destinationCode?: string,
  ) => void
} {
  const isLoading = ref(false)
  const isSubscribed = ref(false)
  const sendRequest = (
    email: string,
    originCode: string,
    destinationCode?: string,
  ) => {
    const payload = new URLSearchParams({
      email,
      originCode,
    })
    if (destinationCode) {
      payload.set('destinationCode', destinationCode)
    }
    isLoading.value = true

    useKy()
      .post('/subscribe', { body: payload })
      .then(() => {
        isSubscribed.value = true
        Notify.create({
          icon: matDone,
          color: 'positive',
          message: useI18n().t('components.subscribe.notification') as string,
        })
      })
      .catch(() => {
        isSubscribed.value = false
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return { isSubscribed, isLoading, sendRequest }
}
