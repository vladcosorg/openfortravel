<template>
  <div class="row items-center q-gutter-x-md">
    <div class="q-gutter-x-md gt-xs">
      <a href="javascript:void(0)" class="text-white"> Pull requests </a>
      <a href="javascript:void(0)" class="text-white"> Issues </a>
      <a href="javascript:void(0)" class="text-white"> Marketplace </a>
      <a href="javascript:void(0)" class="text-white"> Explore </a>
    </div>
    <q-btn
      flat
      dense
      round
      :icon="$q.screen.lt.md ? menuIcon : moreIcon"
      @click="$emit('input', true)"
    />
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import {
  matMenu as menuIcon,
  matMoreVert as moreIcon,
} from '@quasar/extras/material-icons'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return { menuIcon, moreIcon }
  },
})
</script>
