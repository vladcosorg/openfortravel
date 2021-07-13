<template>
  <country-dropdown
    v-model="model"
    borderless
    behavior="dialog"
    inherit-font-size
    inline
    no-ellipsis
    dense
  >
    <template #selected>
      <country-label regular focused :value="destinationIso" />
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import { createDestinationRoute } from '@/front/src/router/factory'
import { useRootStore, useRouter } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    CountryLabel,
    CountryDropdown,
  },
  inheritAttrs: false,
  props: {
    destinationIso: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const model = computed({
      get() {
        return props.destinationIso
      },
      async set(destinationCode: string) {
        await useRouter().push(
          createDestinationRoute({
            originCode:
              useRootStore().state.visitorContext[RestrictionNodeType.ORIGIN],
            destinationCode,
          }),
        )
      },
    })

    return { model }
  },
})
</script>
