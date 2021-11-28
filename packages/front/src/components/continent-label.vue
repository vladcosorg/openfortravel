<template>
  <span>{{ label }}</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import {
  getContinentLabel,
  getMappedContinentID,
} from '@/shared/src/modules/continent-map/continent-map-helpers'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  fromCountry: {
    type: Boolean,
  },
})

const label = computed(() =>
  props.fromCountry
    ? getContinentLabel(getMappedContinentID(props.value))
    : getContinentLabel(props.value),
)
</script>
