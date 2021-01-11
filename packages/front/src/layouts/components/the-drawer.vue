<template>
  <q-drawer v-bind="$attrs" behavior="mobile" v-on="$listeners">
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-for="(link, title) in links"
          :key="title"
          v-ripple
          clickable
          :to="link"
        >
          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <the-dark-mode-toggle />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheDarkModeToggle from '@/front/src/layouts/components/the-header/the-dark-mode-toggle.vue'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { TheDarkModeToggle },
  setup() {
    const i18n = useI18n()
    const locale = i18n.locale
    const links = {
      [i18n.t('page.index.link')]: {
        name: 'terms',
        params: { locale },
      },
      [i18n.t('page.privacy.link')]: {
        name: 'terms',
        params: { locale },
      },
      [i18n.t('page.terms.link')]: {
        name: 'terms',
        params: { locale },
      },
      [i18n.t('page.contact.link')]: {
        name: 'terms',
        params: { locale },
      },
    }
    return { links }
  },
})
</script>
