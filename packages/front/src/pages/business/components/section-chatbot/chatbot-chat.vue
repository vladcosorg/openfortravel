<template>
  <chatbot-tree v-intersection="intersectionConfig" :is-visible="isVisible" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import ChatbotTree from '@/front/src/pages/business/components/section-chatbot/chatbot-tree.vue'

const isVisible = ref(false)
const intersectionConfig = {
  handler: (entry: IntersectionObserverEntry) => {
    isVisible.value = entry.isIntersecting
  },
  cfg: {
    threshold: 0.2,
  },
}
</script>
