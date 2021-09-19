<template>
  <div class="bg-elevation-1 gt-xs">
    <q-toolbar class="container">
      <div class="q-gutterr-md">
        <q-breadcrumbs class="breadcrumbs">
          <template #separator>
            <q-icon size="1.5em" :name="matChevronRight" color="primary" />
          </template>
          <template v-if="items" #default>
            <q-breadcrumbs-el
              :icon="matHome"
              :to="homepageURL"
              :label="$t('components.breadcrumbs.homeLabel')"
            />
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

<style lang="scss">
.breadcrumbs a {
  color: var(--q-secondary);
  text-decoration: underline;
}
</style>

<script lang="ts">
import { matHome, matChevronRight } from '@quasar/extras/material-icons'
import { computed, defineComponent, PropType } from 'vue'

import { getMenuItemURL } from '@/front/src/misc/menu'
import { useMetaJsonLd } from '@/front/src/misc/meta'
import { getAbsoluteURL } from '@/front/src/router/helpers'
import { Breadcrumbs } from '@/shared/src/misc/type-helpers'

export default defineComponent({
  components: {},
  props: {
    items: {
      type: Array as PropType<Breadcrumbs>,
      required: false,
    },
  },
  setup(props) {
    useMetaJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (props.items ?? []).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(typeof item.to === 'string'
          ? { item: getAbsoluteURL(item.to) }
          : {}),
      })),
    })
    return {
      matHome,
      matChevronRight,
      homepageURL: computed(() => getMenuItemURL('index')),
    }
  },
})
</script>
