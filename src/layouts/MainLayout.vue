<template>
  <q-layout view="hhr lpr ffr">
    <q-header>
      Open for travel
      <language-switcher/>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import LanguageSwitcher from 'components/LanguageSwitcher.vue'

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  components: { LanguageSwitcher },

  setup () {
    // const leftDrawerOpen = ref(false)
    // const essentialLinks = ref(linksData)
    //
    // return { leftDrawerOpen, essentialLinks }
  }
})
</script>
