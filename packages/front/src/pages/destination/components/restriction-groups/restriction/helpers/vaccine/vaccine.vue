<template>
  <b>{{ label }}</b>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import type { VaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

import type { PropType } from 'vue'

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
