<template>
  <div class="bg-elevation-1 overflow-auto q-py-xl q-mb-xl relative-position">
    <!--    <the-flag-background-->
    <!--      :first-country-code="originCode"-->
    <!--      :second-country-code="destinationCode"-->
    <!--    />-->
    <div class="container">
      <the-country-list
        class="q-mb-xl"
        :origin-code="originCode"
        :destination-code="destinationCode"
      />
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from '@/front/src/layouts/components/the-flag-background.vue'

export default defineComponent({
  components: { TheFlagBackground, TheCountryList },
  props: {
    originCode: {
      type: String,
      default: undefined,
    },
    destinationCode: {
      type: String,
      required: false,
      default: undefined,
    },
  },
})
</script>
