<template>
  <span>{{ label }}</span>
</template>

<style lang="scss" module></style>

<script lang="ts" setup>
import { computed } from 'vue'

import { getContinentLabel } from '@/shared/src/modules/continent-map/continent-map-helpers'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})

const label = computed(() => getContinentLabel(props.value))
</script>
