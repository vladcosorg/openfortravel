<template>
  <div class="q-mt-lg">
    <q-no-ssr :class="`rounded-borders ${$style.grid} q-col-gutter-lg`">
      <template #default>
        <q-intersection
          v-for="(destination, index) in items"
          :key="index"
          :class="[$style.gridItem, 'col']"
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
  </div>
</template>
<style lang="scss" module>
.grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  //display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  //grid-auto-rows: 1fr;
  //grid-gap: map-get($space-sm, 'x');

  //display: flex;
  //flex-wrap: wrap;
  @media (min-width: $breakpoint-sm-min) {
    //grid-gap: map-get($space-lg, 'x');
  }

  :after {
    content: '';
    flex: auto;
  }

  :global {
    .q-intersection {
      height: 164px;
      @media (min-width: $breakpoint-sm-min) {
        height: 295px;
      }

      min-width: 275px;
    }
    .q-intersection > div {
      height: 100%;
    }
  }
}

.gridItem {
  :global {
  }
}
</style>

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
