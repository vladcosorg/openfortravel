<template>
  <a href="" class="text-dotted-underline">
    <country-label :value="value" regular />
  </a>
</template>

<style lang="scss" module />

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { CountryLabel },
  props: {},
  setup() {
    const store = useRootStore()
    const value = computed(
      () => store.state.visitorContext[RestrictionNodeType.ORIGIN],
    )

    return { value }
  },
})
</script>
