<template>
  <div class="row items-center q-gutter-x-md">
    <div :class="['q-gutter-x-md gt-sm text-white links']">
      <router-link
        v-for="(title, url, index) in menuItems"
        :key="index"
        :to="url"
        exact
        >{{ title }}</router-link
      >
    </div>
    <q-btn
      flat
      dense
      round
      :icon="$q.screen.lt.md ? menuIcon : moreIcon"
      color="primary"
      @click="$emit('update:modelValue', true)"
    />
  </div>
</template>

<style lang="scss" scoped>
.links {
  & > a {
    color: var(--q-primary);
  }
  .router-link-active {
    color: var(--q-secondary);
    font-weight: bold;
  }
}
</style>

<script lang="ts">
import {
  matMenu as menuIcon,
  matMoreVert as moreIcon,
} from '@quasar/extras/material-icons'
import { computed, defineComponent } from 'vue'

import { getShortHeaderMenuItems } from '@/front/src/misc/menu'

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return { menuItems: computed(getShortHeaderMenuItems), menuIcon, moreIcon }
  },
})
</script>
