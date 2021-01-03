<template>
  <q-list class="rounded-borders">
    <q-no-ssr>
      <template #default>
        <q-intersection
          v-for="(destination, index) in items"
          :key="index"
          style="min-height: 212px"
          class="q-mb-md"
        >
          <destination-item
            :loading="loading"
            :destination="destination"
            :country="
              destination ? countries.get(destination.destination) : undefined
            "
          />
        </q-intersection>
      </template>
      <template #placeholder>
        <ul>
          <li v-for="(destination, index) in items" :key="index">
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
          </li>
        </ul>
      </template>
    </q-no-ssr>
  </q-list>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import { CountryMap } from '@/front/src/pages/country/country-store'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
    },
    countries: {
      type: Map as PropType<CountryMap>,
      required: false,
    },
    destinations: {
      type: Array as PropType<Restriction[]>,
      required: false,
    },
  },
  setup(props) {
    const itemsRef = computed(() => {
      if (!props.loading) {
        return props.destinations
      }

      return new Array(5)
    })

    return {
      items: itemsRef,
    }
  },
})
</script>
