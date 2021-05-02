import type {
  ComputedRef,
  Ref,
  UnwrapRef,
  WritableComputedRef} from '@vue/composition-api';
import {
  computed,
  getCurrentInstance,
  ref
} from '@vue/composition-api'

// eslint-disable-next-line import/no-unused-modules
export function useClosedLoopModel<T>(
  defaultValue: T,
): {
  modelRef: ComputedRef<T>
} {
  const instance = getCurrentInstance()
  const valueRef = ref<T>(defaultValue)
  const modelRef = computed<T>({
    get() {
      return valueRef.value as T
    },
    set(value) {
      valueRef.value = value as UnwrapRef<T>
      instance?.$emit('input', value)
    },
  })

  return {
    modelRef,
  }
}

export function usePassthroughModel<T>(
  inputRef: Ref<T>,
): {
  modelRef: WritableComputedRef<T>
} {
  const instance = getCurrentInstance()

  const modelRef = computed<T>({
    get() {
      return inputRef.value
    },
    set(value) {
      instance?.$emit('input', value)
    },
  })

  return { modelRef }
}

export function useBufferedModel<T>(
  inputRef: Ref<T>,
  defaultValue?: T,
): {
  modelRef: WritableComputedRef<T>
  isBuffering: Ref<boolean>
  emit: () => void
  reset: () => void
} {
  const instance = getCurrentInstance()
  const bufferRef = ref<T | undefined>(inputRef.value ?? defaultValue)
  const isBuffering = ref(false)
  const modelRef = computed<T>({
    get() {
      if (isBuffering.value || inputRef.value === undefined) {
        return bufferRef.value as T
      }

      return inputRef.value
    },
    set(value) {
      isBuffering.value = true
      bufferRef.value = value as UnwrapRef<T>
    },
  })

  const emit = () => {
    instance?.$emit('input', bufferRef.value)
    isBuffering.value = false
  }

  const reset = () => {
    isBuffering.value = false
  }

  return {
    modelRef,
    emit,
    reset,
    isBuffering,
  }
}

/**
 * Returns the last non-falsy value
 * @param getter
 */
export function useComputedMemorized<T>(
  getter: () => T,
): ComputedRef<Exclude<T, null | undefined>> {
  const memorizedValueRef = ref()
  return computed(() => {
    const newValue = getter()

    if (newValue) {
      memorizedValueRef.value = newValue
    }
    return memorizedValueRef.value
  })
}
