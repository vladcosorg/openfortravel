<template>
  <div class="text-center q-mb-xl">
    <h5
      v-if="restriction && !isLoading"
      v-html="
        $t('page.destination.heading', {
          origin: restriction.originLabel,
          destination: restriction.destinationLabel,
        })
      "
    />
    <h5 v-else>
      <q-skeleton class="inline-block" type="text" width="80%" />
    </h5>
    <div v-if="destination">
      <!--      <stats :is-loading="isLoading" />-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { riskLevelColor } from '@/front/src/pages/country/composable'
import Stats from '@/front/src/pages/destination/components/stats.vue'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { Stats },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    restriction: {
      type: Object as PropType<Restriction>,
    },
    destination: {
      type: Object as PropType<Destination>,
    },
  },
  setup() {
    return {
      riskLevelColor,
    }
  },
})
</script>
