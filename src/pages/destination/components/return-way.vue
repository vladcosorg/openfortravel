<template>
  <q-card
    flat
    square
    :class="[$style.card, 'bg-blue-grey-10']"
    style="margin-left: -16px; margin-right: -16px"
  >
    <q-card-section>
      <div class="text-subtitle1">{{ $t('page.destination.returnWay') }}</div>
      <destination-item returning :destination="restriction" />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" module>
.card {
}
</style>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api'

import TheFlagBackground from 'src/layouts/components/the-flag-background.vue'
import DestinationItem from 'src/pages/country/components/destination-item.vue'
import { getRestriction } from 'src/pages/destination/destination-composable'

export default defineComponent({
  components: { DestinationItem, TheFlagBackground },
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
    return { restriction: restrictionRef, loading: loadingRef }
  },
})
</script>
