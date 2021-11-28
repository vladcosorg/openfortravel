import { watchOnce } from '@vueuse/core'
import { Ref } from 'vue'

export function useDeferredCallback(
  callback: () => void,
  conditionRef: Ref<boolean>,
) {
  return () => {
    if (conditionRef.value) {
      callback()
    } else {
      watchOnce(conditionRef, (newCondition) => {
        if (!newCondition) {
          return
        }
        callback()
      })
    }
  }
}
