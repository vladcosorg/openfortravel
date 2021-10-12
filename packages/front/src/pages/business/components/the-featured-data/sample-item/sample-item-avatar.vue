<template>
  <q-item-section avatar>
    <q-avatar size="5rem" text-color="primary" class="relative-position">
      <slot />
      <span
        class="
          text-body2 text-bold
          bg-white
          text-primary-inverse
          q-px-xs
          character-label
        "
        >{{ name }}</span
      >
    </q-avatar>
  </q-item-section>
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
