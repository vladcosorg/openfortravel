<template>
  <div class="q-my-md">
    <div v-for="(highlight, key) in highlights" :key="key">
      <q-icon v-if="highlight.positive" :name="positiveIcon" color="positive" />
      <q-icon v-else :name="negativeIcon" color="negative" />
      {{ highlight.label }}
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import {
  ionRemoveOutline as negativeIcon,
  ionAddOutline as positiveIcon,
} from '@quasar/extras/ionicons-v5'
import { computed, defineComponent, PropType } from '@vue/composition-api'

import { TripCard } from '@/front/src/models/TripCard'

export default defineComponent({
  components: {},
  props: {
    journey: {
      type: Object as PropType<TripCard>,
    },
  },
  setup(props) {
    const highlights = computed(() =>
      props.journey.highlights.map((item) => {
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

          case 'pcr-test':
            return {
              label: 'PCR-test required',
              positive: false,
            }

          case 'no-pcr-test':
            return {
              label: 'No PCR-test',
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
      }),
    )

    return { highlights, positiveIcon, negativeIcon }
  },
})
</script>
