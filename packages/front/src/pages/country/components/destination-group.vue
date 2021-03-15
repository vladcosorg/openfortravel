<template>
  <q-no-ssr :class="['rounded-borders', $style.grid]">
    <template #default>
      <div
        v-for="index in renderIndex"
        :key="index"
        v-intersection="onIntersection"
        :data-id="index"
        :class="[
          $style.gridItem,
          'col',
          'q-intersection',
          {
            'bg-elevation-1': !inView[index],
          },
        ]"
      >
        <destination-item
          v-if="inView[index] && destinations[index]"
          :loading="loading"
          :destination="destinations[index]"
          :country="
            destinations[index] ? countries.get(destinations[index].destination) : undefined
          "
        />
      </div>
    </template>
    <template #placeholder>
      <div
        v-for="(destination, index) in items"
        :key="index"
        :class="[$style.gridItem, 'col', 'q-intersection', 'bg-elevation-1']"
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
import { computed, defineComponent, PropType, ref, watch } from '@vue/composition-api'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import { CountryMap } from '@/front/src/pages/country/country-store'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    countries: {
      type: Map as PropType<CountryMap>,
      required: false,
    },
    destinations: {
      type: Array as PropType<Restriction[]>,
      required: true,
    },
  },
  setup(props) {
    const renderIndex = ref(15)
    const inView = ref<boolean[]>(
      Array.from<boolean>({ length: 250 }).fill(false),
    )

    const items = computed(() => {
      if (!props.loading) {
        return props.destinations
      }

      return Array.from({ length: 5 })
    })

    watch(
      () => props.loading,
      (newValue) => {
        if (!newValue) {
          const itemCount = items.value.length
          const timeout = setInterval(() => {
            let newRenderIndex = renderIndex.value + 15

            if (newRenderIndex >= itemCount) {
              newRenderIndex = itemCount
              clearInterval(timeout)
            }

            renderIndex.value = newRenderIndex
          }, 100)
        }
      },
    )

    const onIntersection = (entry: IntersectionObserverEntry) => {
      const target = (entry.target as unknown) as HTMLElement
      const id = target.dataset.id

      if (!id) {
        return
      }

      const index = Number.parseInt(id, 10)
      setTimeout(() => {
        inView.value.splice(index, 1, entry.isIntersecting)
      }, 50)
    }

    return {
      renderIndex,
      inView,
      onIntersection,
      items,
    }
  },
})
</script>
