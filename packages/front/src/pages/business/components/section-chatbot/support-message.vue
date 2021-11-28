<template>
  <chat-message
    name="Customer Support"
    :avatar="require('../../../../assets/chatbot.svg')"
    sent
  >
    <slot />
  </chat-message>
</template>

<script lang="ts" setup>
import ChatMessage from '@/front/src/pages/business/components/section-chatbot/chat-message.vue'
</script>
