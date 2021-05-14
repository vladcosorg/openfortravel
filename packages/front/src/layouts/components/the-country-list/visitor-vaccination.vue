<template>
  <simple-select
    v-model="internalValue"
    :options="options"
    dense
    label="Are you vaccinated?"
    class="text-h6"
    standout
    :dropdown-icon="icon"
    emit-value
    map-options
    style="min-width: 20%"
  />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { computed, defineComponent } from '@vue/composition-api'

import SimpleSelect from '@/front/src/components/simple-select.vue'
import { useAugmentedStore } from '@/shared/src/composables/use-plugins'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { SimpleSelect },
  props: {},
  setup() {
    const store = useAugmentedStore()
    const options = computed(() => [
      { label: 'No', value: false },
      ...transformFlatMapToArrayOfPairs(vaccineLabels),
    ])
    const internalValue = computed<string | boolean>({
      get() {
        return useAugmentedStore().state.visitorContext[
          RestrictionNodeType.VACCINATED
        ]
      },
      set(value) {
        store.mutations.setVisitorContextField({
          field: RestrictionNodeType.VACCINATED,
          value,
        })
      },
    })
    return { internalValue, options, icon }
  },
})
</script>
