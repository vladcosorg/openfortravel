import { Ref } from '@vue/composition-api'

import { useRequestDispatcher as useGenericRequestDispatcher } from '@/front/src/composables/request-dispatcher'
import { useKy, useVueI18n } from '@/shared/src/composables/use-plugins'

export function useRequestDispatcher(): {
  isLoading: Ref<boolean>
  isSuccessful: Ref<boolean | undefined>
  sendRequest: (
    email: string,
    originCode: string,
    destinationCode?: string,
  ) => void
  reset: () => void
} {
  const {
    isSuccessful,
    isLoading,
    dispatcher,
    reset,
  } = useGenericRequestDispatcher()
  const { t } = useVueI18n()

  const sendRequest = async (
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

    await dispatcher(
      useKy().post('/subscribe', { body: payload }),
      t('components.subscribe.notification') as string,
    )
  }

  return { isSuccessful, isLoading, sendRequest, reset }
}
