<template>
  <div style="height: 2rem">
    <loader v-if="!hideSpinner" width="15" dark class="q-mr-sm" /><slot />
  </div>
</template>

<script lang="ts" setup>
import Loader from '@/front/src/components/loader.vue'

defineProps<{ hideSpinner?: boolean }>()
</script>
