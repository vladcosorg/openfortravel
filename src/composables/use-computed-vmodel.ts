import {
  getCurrentInstance,
  computed,
  WritableComputedRef,
  ref,
  UnwrapRef,
  Ref,
} from '@vue/composition-api'

export function useComputedVmodel<T>(
  prop: Ref<T> | undefined,
  defaultValue: T,
  event = 'input',
): WritableComputedRef<T> {
  const instance = getCurrentInstance()
  if (prop?.value !== undefined) {
    return computed<T>({
      get() {
        return prop.value
      },
      set(value) {
        instance?.$emit(event, value)
      },
    })
  }

  const internalValue = ref<T>(defaultValue)
  return computed<T>({
    get() {
      return internalValue.value as T
    },
    set(value) {
      internalValue.value = value as UnwrapRef<T>

      instance?.$emit(event, value)
    },
  })
}
