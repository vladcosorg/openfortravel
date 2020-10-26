<template>
  <q-layout view="hhr lpr ffr">
    <q-header reveal>
      <logo />
    </q-header>
    <q-footer>
      <q-toolbar style="background-color: #222930">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-page-container class="window-height column">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeaderBar from 'components/header-bar.vue'
import Logo from 'components/logo.vue'

export default defineComponent({
  components: { HeaderBar, Logo },
})
</script>
