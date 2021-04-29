<template>
  <b>{{ label }}</b>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import {
  VaccineBrand,
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
