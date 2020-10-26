<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useCountryListLoader } from 'src/misc/i18n-country-list'

export default defineComponent({
  name: 'App',
  setup() {
    useCountryListLoader()
  },
})
</script>
