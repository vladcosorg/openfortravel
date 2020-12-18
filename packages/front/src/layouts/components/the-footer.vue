<template>
  <div>
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
          :to="{ params: { locale: lang.value } }"
        >
          {{ lang.label }}
        </router-link>
      </div>
      <div class="q-mt-md text-caption">
        {{ $t('components.footer.copyright') }}
      </div>
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

export default defineComponent({
  props: {},
  setup() {
    return { langs: Object.freeze(langs) }
  },
})
</script>
