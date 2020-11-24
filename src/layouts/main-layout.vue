<template>
  <q-layout view="hhr lpr ffr">
    <portal-target name="top" slim />

    <q-header class="bg-transparent">
      <header-bar class="q-pb-lg" />
    </q-header>

    <q-footer class="text-caption text-center q-py-md">
      Copyright 2020
    </q-footer>

    <q-page-container
      :class="[
        $style.container,
        'q-px-md',
        fullHeight && !$q.platform.is.safari ? 'window-height' : '',
      ]"
    >
      <router-view />
    </q-page-container>
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

import { useI18n } from 'src/composables/use-plugins'
import HeaderBar from 'src/layouts/components/the-header-bar.vue'

export default defineComponent({
  components: {
    HeaderBar,
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
