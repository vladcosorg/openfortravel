<template>
  <q-chat-message text-html class="animated fadeInDown text-subtitle1">
    <slot v-if="!loading" />
    <q-spinner-dots v-else size="2rem" />
  </q-chat-message>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'

const emit = defineEmits<{
  (e: 'ready'): void
}>()
const loading = ref(true)
onMounted(() =>
  setTimeout(() => {
    loading.value = false
    nextTick(() => {
      emit('ready')
    })
  }, 2000),
)
</script>
