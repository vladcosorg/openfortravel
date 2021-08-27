<template>
  <q-tabs
    v-model="model"
    no-caps
    dense
    narrow-indicator
    active-color="secondary"
  >
    <q-tab name="all" :label="$t('page.country.tab.all')" />
    <q-tab
      v-for="(continentLabel, continentId) in continentList"
      :key="continentId"
      :name="continentId"
      :label="continentLabel"
    />
  </q-tabs>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useDelayedSetter } from '@/front/src/composables/misc'
import { useCountryStore } from '@/front/src/pages/country/pinia-store'
import {
  getContinentList,
  getMappedContinentID,
} from '@/shared/src/modules/continent-map/continent-map-helpers'

export default defineComponent({
  components: {},
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useCountryStore()
    const { model } = useDelayedSetter(
      computed({
        get() {
          return store.continentFilter ?? 'all'
        },
        set(newValue: string | undefined) {
          store.continentFilter = newValue === 'all' ? undefined : newValue
        },
      }),
    )

    const continentList = computed(() =>
      getContinentList(getMappedContinentID(props.originCode)),
    )
    return { continentList, model }
  },
})
</script>
