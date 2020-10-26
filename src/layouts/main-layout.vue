<template>
  <container :fullheight="fullHeight">
    <header-bar />
    <travel-bar
      v-if="showTravelBar"
      :class="{ 'q-mt-xl': !fullHeight, 'order-last': fullHeight }"
      :show-arrow="fullHeight"
    />
    <router-view />
  </container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Container from 'layouts/components/the-layout-container.vue'
import HeaderBar from 'layouts/components/the-header-bar.vue'
import TravelBar from 'layouts/components/the-travel-bar.vue'

export default defineComponent({
  components: { HeaderBar, TravelBar, Container },
  meta: {
    title: 'lol',
    titleTemplate: (title: string) => `${title} - Open For Travel`,
  },
  props: {
    fullHeight: {
      type: Boolean,
      default: false,
    },
    showTravelBar: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
