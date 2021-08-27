<template>
  <div>
    <div v-for="(highlight, key) in highlights" :key="key">
      <q-icon v-if="highlight.positive" :name="positiveIcon" color="positive" />
      <q-icon v-else :name="negativeIcon" color="negative" />
      {{ highlight.label }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  ionRemoveOutline as negativeIcon,
  ionCheckmark as positiveIcon,
} from '@quasar/extras/ionicons-v5'
import { computed, defineComponent, PropType } from 'vue'

import { RoundTrip } from '@/shared/src/models/trip/round-trip'

export default defineComponent({
  components: {},
  props: {
    trip: {
      type: Object as PropType<RoundTrip>,
      required: true,
    },
  },
  setup(props) {
    const highlights = computed(() => {
      const values = props.trip.highlights.map((item) => {
        switch (item) {
          case 'quarantine':
            return {
              label: 'Quarantine required',
              positive: false,
            }

          case 'no-quarantine':
            return {
              label: 'No quarantine',
              positive: true,
            }

          case 'no-return-quarantine':
            return {
              label: 'No quarantine upon return',
              positive: true,
            }

          case 'pcr-test':
            return {
              label: 'PCR-test required',
              positive: false,
            }

          case 'no-pcr-test':
            return {
              label: 'No COVID test',
              positive: true,
            }

          case 'return-pcr-test':
            return {
              label: ' COVID-test upon return required',
              positive: false,
            }
          case 'no-return-pcr-test':
            return {
              label: 'No COVID-test upon return required',
              positive: true,
            }
          case 'insurance':
            return {
              label: 'Additional insurance required',
              positive: true,
            }

          default:
            return {
              label: item,
              positive: true,
            }
        }
      })

      return values.sort((a, b) => +b.positive - +a.positive)
    })

    return { highlights, positiveIcon, negativeIcon }
  },
})
</script>
