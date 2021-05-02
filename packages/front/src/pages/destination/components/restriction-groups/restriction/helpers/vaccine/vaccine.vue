<template>
  <b>{{ label }}</b>
</template>

<style lang="scss" module></style>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api'

import type {
  VaccineBrand} from '@/shared/src/restriction-tree/restriction-node/vaccinated';
import {
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: {},
  props: {
    id: {
      type: String as PropType<VaccineBrand>,
    },
  },
  setup(props) {
    const label = computed(() => vaccineLabels[props.id])
    return { label }
  },
})
</script>
