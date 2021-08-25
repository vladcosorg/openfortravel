<template>
  <div class="grid q-mb-xl">
    <q-no-ssr>
      <template #default>
        <div v-for="(trip, key) in results" :key="key" class="col">
          <destination-item hide-border :loading="loading" :trip="trip" />
        </div>
      </template>
      <template #placeholder>
        <div
          v-for="(destination, index) in results"
          :key="index"
          class="bg-elevation-1 col"
        >
          <router-link
            :title="
              $t('components.destinationItem.ssrAttrTitle', {
                to: destination.outgoing.destination.destinationLabel,
              })
            "
            :to="{
              name: 'destination',
              params: {
                originSlug: destination.outgoing.origin.originSlug,
                destinationSlug:
                  destination.outgoing.destination.destinationSlug,
              },
            }"
          >
            {{
              $t('components.destinationItem.ssrTitle', {
                from: destination.outgoing.origin.originLabel,
                to: destination.outgoing.destination.destinationLabel,
              })
            }}
          </router-link>
        </div>
      </template>
    </q-no-ssr>

    <div class="text-center q-mt-lg">
      <q-btn v-if="collapseAfter" color="elevation-1"> Show all </q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: map-get($space-sm, 'x');

  @media (min-width: $breakpoint-sm-min) {
    grid-gap: map-get($space-lg, 'x');
  }
}
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'

import type { PropType } from 'vue'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
    },
    destinations: {
      type: Array as PropType<RoundTripCollection>,
      default: () => [],
    },
    collapseAfter: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const results = computed(() =>
      props.collapseAfter
        ? props.destinations.slice(0, props.collapseAfter)
        : props.destinations,
    )
    return { results }
  },
})
</script>
