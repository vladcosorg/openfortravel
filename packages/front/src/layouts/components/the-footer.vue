<template>
  <div>
    <portal-target name="footer" />
    <div class="text-center q-my-lg q-mx-md">
      <div class="text-subtitle1 text-uppercase text-bold q-mb-lg">
        {{ $t('components.footer.languages') }}
      </div>
      <div
        :class="[
          $style.languages,
          'text-subtitle2',
          'text-primary',
          'q-gutter-sm',
        ]"
      >
        <router-link
          v-for="lang in langs"
          :key="lang.value"
          rel="alternate"
          :hreflang="lang.value"
          :to="{ params: { locale: lang.value } }"
        >
          {{ lang.label }}
        </router-link>
      </div>
      <div class="q-mt-md text-caption">
        {{
          $t('components.footer.disclaimer', {
            date: lastUpdated,
          })
        }}
      </div>
      <div
        class="q-mt-md text-caption"
        v-html="
          $t('components.footer.lastUpdated', {
            date: lastUpdated,
          })
        "
      />
    </div>
  </div>
</template>

<style module lang="scss">
.languages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  a {
    color: $secondary;
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'
import { PortalTarget } from 'portal-vue'
import { date } from 'quasar'

export default defineComponent({
  components: {
    PortalTarget,
  },
  props: {},
  setup() {
    return {
      langs: Object.freeze(langs),
      lastUpdated: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    }
  },
})
</script>
