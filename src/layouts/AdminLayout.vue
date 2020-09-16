<template>
  <q-layout view="hhr lpr ffr">
    <q-header reveal style="background-color: #222930">
      <q-toolbar class="q-px-md q-py-md">
        <q-icon
          :name="`img:${require('src/assets/logo.svg')}`"
          style="height: auto; width: 100px"
        />
        <q-space />
      </q-toolbar>
    </q-header>
    <q-footer>
      <q-toolbar style="background-color: #222930">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
