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
import Container from 'components/Container.vue'
import HeaderBar from 'components/HeaderBar.vue'
import TravelBar from 'components/TravelBar.vue'


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
