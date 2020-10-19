import {
  getCurrentInstance,
  computed,
  WritableComputedRef,
} from '@vue/composition-api'

export function useComputedVmodel<T>(prop: T): WritableComputedRef<T> {
  const instance = getCurrentInstance()
  return computed<T>({
    get() {
      return prop
    },
    set(value) {
      instance?.$emit('input', value)
    },
  })
}
