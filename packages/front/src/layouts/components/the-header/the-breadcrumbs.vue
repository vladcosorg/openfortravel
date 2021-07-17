<template>
  <div class="bg-elevation-1 gt-xs">
    <q-toolbar class="container">
      <div class="q-gutterr-md">
        <q-breadcrumbs :class="$style.breadcrumbs">
          <template #separator>
            <q-icon size="1.5em" :name="matChevronRight" color="primary" />
          </template>
          <template v-if="items" #default>
            <q-breadcrumbs-el :icon="matHome" :to="homepageURL" label="Home" />
            <q-breadcrumbs-el
              v-for="(item, index) in items"
              :key="index"
              v-bind="item"
            />
          </template>
          <template v-else #default>
            <q-breadcrumbs-el>
              <q-skeleton type="text" height="21px" width="110px" />
            </q-breadcrumbs-el>
            <q-breadcrumbs-el>
              <q-skeleton type="text" height="21px" width="140px" />
            </q-breadcrumbs-el>
            <q-breadcrumbs-el>
              <q-skeleton type="text" height="21px" width="90px" />
            </q-breadcrumbs-el>
          </template>
        </q-breadcrumbs>
      </div>
    </q-toolbar>
  </div>
</template>

<style lang="scss" module>
.breadcrumbs a {
  color: var(--q-secondary);
  text-decoration: underline;
}
</style>

<script lang="ts">
import { matHome, matChevronRight } from '@quasar/extras/material-icons'
import { computed, defineComponent } from 'vue'

import { getMenuItemURL } from '@/front/src/misc/menu'

export default defineComponent({
  components: {},
  props: {
    items: {
      type: Array,
      required: false,
    },
  },
  setup() {
    return {
      matHome,
      matChevronRight,
      homepageURL: computed(() => getMenuItemURL('index')),
    }
  },
})
</script>
