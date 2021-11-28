<template>
  <img
    alt="Loading..."
    width="30"
    src="../assets/loader.svg"
    :style="dark ? { filter: 'brightness(0%)' } : {}"
  />
</template>

<script lang="ts" setup>
defineProps<{ dark?: boolean }>()
</script>
