<template>
  <q-layout view="hhr lpr ffr">
    <portal-target name="top" slim />

    <q-header class="bg-transparent">
      <header-bar class="q-pb-lg" />
    </q-header>

    <q-page-container
      :class="[
        $style.container,
        'q-px-md',
        fullHeight && !$q.platform.is.ios ? 'window-height' : '',
      ]"
    >
      <router-view class="q-pb-md" />
    </q-page-container>
    <the-footer />
  </q-layout>
</template>
<style lang="scss" module>
.container {
  overflow-x: hidden;
  background-color: #222930;
  color: white;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PortalTarget } from 'portal-vue'
import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'

import { useI18n } from 'src/composables/use-plugins'

export default defineComponent({
  components: {
    TheFooter: hydrateWhenVisible(
      () => import('src/layouts/components/the-footer.vue'),
    ),
    HeaderBar: hydrateWhenIdle(
      () => import('src/layouts/components/the-header-bar.vue'),
    ),
    PortalTarget,
  },
  meta: {
    title: ' ',
    titleTemplate: (title: string) => {
      const mainTitle = useI18n().t('meta.title')
      if (title.trim().length > 0) {
        return `${title} - ${mainTitle}`
      }

      return mainTitle
    },
  },
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
