<template>
  <ul v-if="stats.length > 0" class="ellipsis-improved full-width">
    <li v-for="{ label, value } in stats" :key="label" class="ellipsis-2-lines">
      <b>{{ label }}</b
      >: {{ value }}
    </li>
  </ul>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api'

import type { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: {},
  props: {
    restrictions: {
      type: Array as PropType<Restriction[]>,
      required: true,
    },
  },
  setup(props) {
    const stats = computed(() =>
      [
        {
          label: 'Test required',
          value: props.restrictions.filter((rest) => rest.testRequired),
        },

        {
          label: 'Isolation required',
          value: props.restrictions.filter((rest) => rest.selfIsolation > 0),
        },
        {
          label: 'Entry forbidden',
          value: props.restrictions.filter((rest) => rest.isForbidden),
        },
      ]
        .filter((item) => item.value.length > 0)
        .map((item) => ({
          label: `${item.label} (${item.value.length})`,
          value: item.value.map((rest) => rest.originLabel).join(', '),
        })),
    )
    return {
      stats,
    }
  },
})
</script>
