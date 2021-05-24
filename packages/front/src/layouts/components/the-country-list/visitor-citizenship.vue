<template>
  <country-select v-model="internalValue" dense label="Citizenship" />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CountrySelect from '@/front/src/layouts/components/the-country-list/country-select.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { CountrySelect },
  props: {},
  setup() {
    const store = useRootStore()
    const internalValue = computed<string>({
      get() {
        return useRootStore().state.visitorContext[
          RestrictionNodeType.CITIZENSHIP
        ]
      },
      set(value) {
        store.mutations.setVisitorContextField({
          field: RestrictionNodeType.CITIZENSHIP,
          value,
        })
      },
    })
    return { internalValue }
  },
})
</script>
