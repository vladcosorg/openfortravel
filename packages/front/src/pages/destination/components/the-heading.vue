<template>
  <div class="text-center q-mb-xl">
    <h5
      v-if="!isLoading"
      v-html="
        $t('page.destination.heading', {
          origin,
          destination,
        })
      "
    />
    <h5 v-else>
      <q-skeleton class="inline-block" type="text" width="80%" />
    </h5>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import {
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const origin = computed(() =>
      getOriginLabelForCountryCode(store.state.currentOriginCode),
    )
    const destination = computed(() =>
      getDestinationLabelForCountryCode(store.state.currentDestinationCode),
    )
    return {
      origin,
      destination,
    }
  },
})
</script>
