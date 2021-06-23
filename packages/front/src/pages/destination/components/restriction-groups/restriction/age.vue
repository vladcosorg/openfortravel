<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      <div class="row items-center">
        <q-icon
          color="negative"
          class="col-auto"
          :name="attentionIcon"
          size="lg"
        />
        <span class="col">
          This section is only applicable to travellers aged
          <b>{{ restriction.options.age }} years old</b> or
          <template v-if="restriction.options.orMore"> more </template>
          <template v-else> less </template>
        </span>
      </div>
    </template>
    <template #subtitle />
  </component>
</template>

<style lang="scss" module>
a[href^='#'] {
  color: var(--q-color-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--q-color-secondary);
}
</style>

<script lang="ts">
import { matPriorityHigh as attentionIcon } from '@quasar/extras/material-icons'
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, inject } from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'

export default defineComponent({
  components: { CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Age>,
      required: true,
    },
    context: {
      type: Number,
      required: false,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.destination)
    return { destination, attentionIcon }
  },
})
</script>
