import { matDone } from '@quasar/extras/material-icons'
import type { ResponsePromise } from 'ky'
import { Notify } from 'quasar'
import type { Ref } from 'vue'
import { ref } from 'vue'

type Dispatcher = (
  request: ResponsePromise,
  successMessage: string,
) => ResponsePromise
export function useRequestDispatcher(): {
  isLoading: Ref<boolean>
  isSuccessful: Ref<boolean | undefined>
  dispatcher: Dispatcher
  reset: () => void
} {
  const isLoading = ref(false)
  const isSuccessful = ref()

  const dispatcher: Dispatcher = (request, successMessage) => {
    isLoading.value = true

    request
      .then(() => {
        isSuccessful.value = true
        Notify.create({
          icon: matDone,
          color: 'positive',
          textColor: 'dark',
          message: successMessage,
        })
      })
      .catch(() => {
        isSuccessful.value = false
      })
      .finally(() => {
        isLoading.value = false
      })

    return request
  }

  const reset = () => (isSuccessful.value = undefined)

  return { isSuccessful, isLoading, dispatcher, reset }
}
