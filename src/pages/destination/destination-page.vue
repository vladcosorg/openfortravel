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
import {
  computed,
  defineComponent,
  onMounted,
  onServerPrefetch,
  ref,
} from '@vue/composition-api'

import { Destination } from 'src/api/destinations'
import { useStore } from 'src/composables/use-plugins'
import { Origin } from 'src/models/origin'

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
  setup({ originCode, destinationCode }) {
    const loading = ref(false)
    onServerPrefetch(async () => {
      await fetchAll(originCode, destinationCode)
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const origin = computed<Origin>(() => useStore().getters.currentOrigin)
    const destination = computed<Destination>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      () => useStore().getters.currentDestination,
    )
    onMounted(async () => {
      if (
        origin.value?.countryCode === originCode &&
        destination.value?.countryCode === destinationCode
      ) {
        return
      }

      loading.value = true
      await fetchAll(originCode, destinationCode)
      loading.value = false
    })

    return { origin, destination, loading }
  },
})
async function fetchAll(originCode: string, destinationCode: string) {
  await useStore().dispatch('loadOrigin', originCode)
  await useStore().dispatch('loadDestination', {
    originCode,
    destinationCode,
  })
}
</script>
