<template>
  <div style="margin-left: -16px; margin-right: -16px">
    <q-card flat square :class="[$style.card, 'bg-blue-grey-10', 'col']">
      <q-card-section>
        <div class="text-subtitle1">{{ $t('page.destination.returnWay') }}</div>
        <destination-item
          returning
          :destination="restriction"
          :loading="loading"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" module>
.card {
  width: 100vw;
}
</style>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import { getRestriction } from '@/front/src/pages/destination/destination-composable'

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
    const { restrictionRef, loadingRef } = getRestriction(
      originCode,
      destinationCode,
      true,
    )
    return {
      restriction: restrictionRef,
      loading: loadingRef,
    }
  },
})
</script>
