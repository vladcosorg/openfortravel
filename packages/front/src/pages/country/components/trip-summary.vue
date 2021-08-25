<template>
  <div>
    Travel from
    <country-label
      regular
      :value="trip.outgoing.origin.countryCode"
      declination="origin"
    />
    to
    <country-label
      regular
      :value="trip.outgoing.destination.countryCode"
      declination="destination"
    />
    is
    <strong>
      {{ status }}
    </strong>
    .
    <span v-if="trip.returning.restrictions.isForbidden" class="text-bold">
      Attention! You may not be able to return back because of the current
      restriction.
    </span>
    <span
      v-else-if="
        !trip.returning.restrictions.isForbidden &&
        trip.returning.restrictions.quarantine
      "
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
import { computed, defineComponent, PropType } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { RoundTrip } from '@/shared/src/models/trip/round-trip'

export default defineComponent({
  components: { CountryLabel },
  props: {
    trip: {
      type: Object as PropType<RoundTrip>,
      required: true,
    },
  },
  setup(props) {
    const status = computed(() => {
      if (props.trip.outgoing.restrictions.isForbidden) {
        return 'forbidden'
      }

      if (props.trip.outgoing.restrictions.quarantine) {
        return 'allowed with quarantine'
      }

      return 'allowed'
    })
    return { status }
  },
})
</script>
