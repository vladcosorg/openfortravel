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
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const store = useRootStore()
    const value = computed(() => {
      const status = store.state.visitorContext[RestrictionNodeType.VACCINATED]
      return status !== undefined
        ? `vaccinated with ${vaccineLabels[status]}`
        : 'not vaccinated'
    })

    return { value, editIcon }
  },
})
</script>
