<template>
  <q-input readonly dense standout :model-value="internalValue" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const internalValue = ref('')
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'finishedTyping', value: string): void
}>()
onMounted(() => {
  let index = 0
  const handle = setInterval(() => {
    const nextChar = props.modelValue.charAt(index)
    index++
    if (!nextChar) {
      clearInterval(handle)
      setTimeout(() => emit('finishedTyping', internalValue.value), 500)
      return
    }

    internalValue.value = internalValue.value + nextChar
  }, 200)
})
</script>
