<template>
  <container :fullheight="fullHeight">
    <header-bar />
    <div v-if="fullHeight" class="col-2 text-h5 row items-center q-px-lg">
      Find out which destinations are open or reopening soon
    </div>

    <div v-if="fullHeight" class="col-3 column items-center position-relative">
      <boy />
    </div>

    <travel-bar :class="{ 'q-mt-xl': !fullHeight }" :show-arrow="fullHeight" />
    <router-view class="col-3" />
  </container>
</template>

<style></style>

<script lang="ts">
import Container from 'components/Container.vue'
import HeaderBar from 'components/HeaderBar.vue'
import TravelBar from 'components/TravelBar.vue'
import Boy from 'components/boy/Boy.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: { HeaderBar, TravelBar, Boy, Container },
  props: {
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>
