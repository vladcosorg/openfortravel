<template>
  <div>
    <h5 v-if="groupName">
      {{ $t('restriction.travel.badgeValue')[groupName] }}
    </h5>
    <div v-if="groupName" class="text-subtitle2">
      The country has no formal restrictions on entry by air, but is still
      monitoring the situation and may have other travel policies in place like
      mandatory testing or quarantines upon arrival.
    </div>
    <q-no-ssr :class="['rounded-borders', $style.grid]">
      <template #default>
        <div
          v-for="(destination, key) in destinations"
          :key="key"
          :class="[$style.gridItem, 'col']"
        >
          <destination-item :loading="loading" :destination="destination" />
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
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import type { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    destinations: {
      type: Array as PropType<Restriction[]>,
      default: () => [],
    },
    groupName: {
      type: String,
      required: false,
    },
  },
  setup(props, { root }) {
    const renderIndex = ref(3)
    const inView = ref<boolean[]>(
      Array.from<boolean>({ length: 250 }).fill(false),
    )

    const items = computed(() => {
      if (!props.loading) {
        return props.destinations
      }

      return Array.from({ length: 2 })
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
