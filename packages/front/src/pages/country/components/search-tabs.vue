<template>
  <q-tabs v-model="internalValue" no-caps active-color="secondary">
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
import { computed, defineComponent } from '@vue/composition-api'

import {
  getContinentList,
  getMappedContinentID,
} from '@/shared/src/modules/continent-map/continent-map-helpers'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: String,
    },
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const internalValue = computed({
      get() {
        if (!props.value) {
          return 'all'
        }

        return props.value
      },
      set(newValue) {
        if (newValue === 'all') {
          newValue = undefined
        }

        emit('input', newValue)
      },
    })
    const continentList = computed(() =>
      getContinentList(getMappedContinentID(props.originCode)),
    )
    return { continentList, internalValue }
  },
})
</script>
