<template>
  <q-layout view="hHr lpr ffr">
    <q-header class="bg-transparent bg-blue-grey-10 text-white">
      <portal-target slim name="header" />
    </q-header>
    <q-page-container class="column">
      <keep-alive include="List">
        <router-view class="q-pb" />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { PortalTarget } from 'portal-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    PortalTarget,
  },
})
</script>
