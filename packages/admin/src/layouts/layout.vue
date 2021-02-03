<template>
  <q-layout view="hHr lpr ffr">
    <q-header class="bg-transparent bg-blue-grey-10 text-white">
      <portal-target slim name="header" />
    </q-header>
    <q-page-container class="window-height column">
      <keep-alive include="List">
        <router-view class="q-pb" />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PortalTarget } from 'portal-vue'

export default defineComponent({
  components: {
    PortalTarget,
  },
})
</script>
