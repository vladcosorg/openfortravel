<template>
  <q-input
    :value="value"
    :placeholder="$t('page.country.quickSearch')"
    :loading="isLoading"
    standout
    dense
    debounce="300"
    stack-label
    dark
    v-on="$listeners"
  >
    <template #prepend>
      <q-icon :name="iconSearch" />
    </template>
    <template #after>
      <subscribe-button :origin-code="originCode" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { matSearch as iconSearch } from '@quasar/extras/material-icons'
import { defineComponent } from '@vue/composition-api'

import SubscribeButton from '@/front/src/pages/country/components/subscribe-button.vue'

export default defineComponent({
  components: { SubscribeButton },
  props: {
    originCode: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return { iconSearch }
  },
})
</script>
