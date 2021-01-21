<template>
  <section>
    <div class="container q-my-xl">
      <h3 class="text-bold text-center q-mb-xl">
        {{ $t('page.index.sections.countries.title') }}
      </h3>
      <div class="row justify-center">
        <the-country-list id="country-list" class="col-md-6 col-sm-8 col-12" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'

export default defineComponent({
  components: { TheCountryList: hydrateWhenIdle(TheCountryList) },
  props: {},
})
</script>
