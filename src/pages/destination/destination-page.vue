<template>
  <q-page>
    <q-btn
      color="primary"
      icon="back"
      label="Back"
      :to="{ name: 'origin', params: { originCode: origin.countryCode } }"
    />
    <div v-if="loading || !destination" class="q-pa-md">
      <q-card flat style="max-width: 300px">
        <q-skeleton height="150px" square />

        <q-card-section>
          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <h5>From {{ origin.countryLabel }} to {{ destination.countryLabel }}</h5>
      <p>
        Travel from {{ origin.countryLabel }} to
        {{ destination.countryLabel }} is {{ destination.status }}.
      </p>
      <q-list bordered separator>
        <q-item>
          <q-item-section>Status: {{ destination.status }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Test: {{ destination.testRequired }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Notes: {{ destination.notes }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useCurrentDestination } from 'src/composables/use-current-destination'
import { useCurrentOrigin } from 'src/composables/use-current-origin'
import { aggregatedLoading } from 'src/composables/use-promise-loading'

export default defineComponent({
  props: {
    originCode: {
      type: String,
      required: true,
    },
    destinationCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const originCode: string = props.originCode
    const destinationCode: string = props.destinationCode

    const { destination, loading: destinationLoading } = useCurrentDestination(
      originCode,
      destinationCode,
    )
    const { origin, loading: originLoading } = useCurrentOrigin(originCode)
    const loading = aggregatedLoading(destinationLoading, originLoading)
    return { origin, destination, loading }
  },
})
</script>
