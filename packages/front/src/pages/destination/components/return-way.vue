<template>
  <q-card square flat :class="['bg-blue-grey-10', 'col']">
    <q-card-section>
      <div class="text-h6">{{ $t('page.destination.returnWay') }}</div>
      <destination-item
        returning
        :destination="restriction"
        :country="destination"
        :loading="loading"
      />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" module>
.card {
  width: 100vw;
}
</style>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import {
  getDestination,
  getRestriction,
} from '@/front/src/pages/destination/destination-composable'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: { DestinationItem },
  props: {
    compact: {
      type: Boolean,
      default: false,
    },
    originCode: {
      required: true,
      type: String,
    },
    destinationCode: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { originCode, destinationCode } = toRefs(props)
    const { restrictionRef, loadingRef: restrictionIsLoading } = getRestriction(
      originCode,
      destinationCode,
      true,
    )
    const { destinationRef, loadingRef: destinationIsLoading } = getDestination(
      destinationCode,
      true,
    )
    return {
      restriction: restrictionRef,
      destination: destinationRef,
      loading: useAggregatedLoader(restrictionIsLoading, destinationIsLoading),
    }
  },
})
</script>
