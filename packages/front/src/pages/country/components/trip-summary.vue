<template>
  <div>
    Travel from
    <country-label regular :value="journey.originISO" declination="origin" />
    to
    <country-label
      regular
      :value="journey.destinationISO"
      declination="destination"
    />
    is
    <strong>
      {{ status }}
    </strong>
    .
    <span v-if="journey.returnIsForbidden" class="text-bold">
      Attention! You may not be able to return back because of the current
      restriction.
    </span>
    <span
      v-if="!journey.returnIsForbidden && journey.quarantineRequired"
      class="text-bold"
    >
      You may have to self-quarantine upon return.
    </span>
    <span v-else>
      Returning back is also allowed and does not require any additional
      expenses.
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { TripCard } from '@/front/src/models/TripCard'

export default defineComponent({
  components: { CountryLabel },
  props: {
    journey: {
      type: Object as PropType<TripCard>,
      required: true,
    },
  },
  setup(props) {
    const status = computed(() => {
      if (props.journey.isForbidden) {
        return 'forbidden'
      }

      if (props.journey.quarantineRequired) {
        return 'allowed with quarantine'
      }

      return 'allowed'
    })
    return { status }
  },
})
</script>
