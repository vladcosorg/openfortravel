<template>
  <q-layout view="hhr lpr ffr">
    <portal-target name="top" slim />
    <q-header class="bg-transparent">
      <header-bar />
    </q-header>
    <q-footer class="text-caption text-center q-py-xs">
      Copyright 2020
    </q-footer>

    <container :fullheight="fullHeight">
      <router-view />
    </container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PortalTarget } from 'portal-vue'

import HeaderBar from 'src/layouts/components/the-header-bar.vue'
import Container from 'src/layouts/components/the-layout-container.vue'

export default defineComponent({
  components: {
    HeaderBar,
    Container,
    PortalTarget,
  },
  meta: {
    title: 'lol',
    titleTemplate: (title: string) => `${title} - Open For Travel`,
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
