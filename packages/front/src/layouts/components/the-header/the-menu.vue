<template>
  <div class="row items-center q-gutter-md-x-md">
    <div
      :class="[
        'q-gutter-x-md gt-sm text-white links text-subtitle1 text-capitalize',
      ]"
    >
      <router-link
        v-for="(title, url, index) in menuItems"
        :key="index"
        :class="url.indexOf('business') > 0 ? 'business' : ''"
        :to="url"
        exact
        >{{ title }}</router-link
      >
    </div>
    <q-btn
      class="lt-md"
      size="md"
      flat
      dense
      :icon="$q.screen.lt.md ? menuIcon : moreIcon"
      @click="$emit('update:modelValue', true)"
    />
  </div>
</template>

<style lang="scss" scoped>
.links {
  & > a {
    color: var(--q-primary);
  }

  & > a.business {
    color: var(--q-info);
  }
  .router-link-active {
    text-decoration: none;
    //color: var(--q-secondary);
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
