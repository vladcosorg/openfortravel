<template>
  <a href="" class="text-dotted-underline">
    {{ value }}
  </a>
</template>

<style lang="scss" module />

<script lang="ts">
import { matEdit as editIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent } from '@vue/composition-api'

import { useRootStore } from '@/shared/src/composables/use-plugins'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const store = useRootStore()
    const value = computed(() => {
      let citizenshipList =
        store.state.visitorContext[RestrictionNodeType.CITIZENSHIP]

      const firstCitizenship = getOriginLabelForCountryCode(
        citizenshipList[0] as string,
      )

      if (citizenshipList.length === 1) {
        return firstCitizenship
      }

      return `${firstCitizenship} (and ${citizenshipList.length - 1} more)`
    })

    return { value, editIcon }
  },
})
</script>
