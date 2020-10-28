<template>
  <img :src="require(`svg-country-flags/svg/${countryCode}.svg`)" />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    countryCode: {
      type: String,
      required: true,
    },
  },
})
</script>
