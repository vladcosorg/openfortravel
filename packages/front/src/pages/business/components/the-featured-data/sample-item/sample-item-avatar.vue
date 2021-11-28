<template>
  <q-avatar
    size="4rem"
    color="elevation-1"
    text-color="primary"
    class="relative-position"
  >
    <slot />
  </q-avatar>
</template>

<style scoped>
.character-label {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>

<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>
