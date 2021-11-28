<template>
  <q-btn
    size="sm"
    text-color="primary-inverse"
    :color="btnColor"
    unelevated
    dense
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{ activate?: boolean | number; color?: string }>(),
  {
    color: 'elevation-1',
  },
)
const emit = defineEmits<{
  (e: 'click'): void
}>()
const btnColor = ref(props.color)

const trigger = () => {
  btnColor.value = 'accent'
  setTimeout(() => emit('click'), 500)
}
if (typeof props.activate === 'number') {
  setTimeout(trigger, props.activate)
} else {
  watch(
    () => props.activate,
    (status) => {
      if (!status) {
        return
      }

      trigger()
    },
    { immediate: true },
  )
}
</script>
