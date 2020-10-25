<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useCountryListLoader } from 'src/misc/I18nCountryList'

export default defineComponent({
  name: 'App',
  setup() {
    useCountryListLoader()
  },
})
</script>
