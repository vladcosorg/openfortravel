<template>
  <a href="" class="text-dotted-underline">
    <country :code="value" regular />
  </a>
</template>

<style lang="scss" module />

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import Country from '@/front/src/components/country.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Country },
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
