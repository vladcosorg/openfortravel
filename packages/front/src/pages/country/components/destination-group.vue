<template>
  <div>
    <q-no-ssr :class="['rounded-borders', $style.grid]">
      <template #default>
        <div
          v-for="(destination, key) in results"
          :key="key"
          :class="[$style.gridItem, 'col']"
        >
          <destination-item
            hide-border
            :loading="loading"
            :journey="destination"
          />
        </div>
      </template>
      <template v-if="!$isDev" #placeholder>
        <div
          v-for="(destination, index) in items"
          :key="index"
          :class="[$style.gridItem, 'col', 'bg-elevation-1']"
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

<style lang="scss" module>
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
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent } from '@vue/composition-api'

import { TripCard } from '@/front/src/models/TripCard'
import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    destinations: {
      type: Array as PropType<TripCard[]>,
      default: () => [],
    },
    groupName: {
      type: String,
      required: false,
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
