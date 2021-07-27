<template>
  <div class="grid">
    <q-no-ssr>
      <template #default>
        <div v-for="(destination, key) in results" :key="key" class="col">
          <destination-item
            hide-border
            :loading="loading"
            :journey="destination"
          />
        </div>
      </template>
      <template #placeholder>
        <div
          v-for="(destination, index) in results"
          :key="index"
          class="'bg-elevation-1 col"
        >
          <router-link
            :title="
              $t('components.destinationItem.ssrAttrTitle', {
                to: destination.destinationLabel,
              })
            "
            :to="{
              name: 'destination',
              params: {
                originSlug: destination.originSlug,
                destinationSlug: destination.destinationSlug,
              },
            }"
          >
            {{
              $t('components.destinationItem.ssrTitle', {
                from: destination.originLabel,
                to: destination.destinationLabel,
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
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { TripCard } from '@/front/src/models/TripCard'
import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
    },
    destinations: {
      type: Array as PropType<TripCard[]>,
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
