<template>
  <q-page>
    Index
  </q-page>
</template>

<script lang="ts">
import CountryList from 'components/CountryList.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',

  components: { CountryList },
  setup () {

  }
})
</script>
