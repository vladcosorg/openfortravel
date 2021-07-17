<template>
  <q-chip
    square
    clickable
    :color="$attrs.color ? $attrs.color : 'elevation-1'"
    size="md"
    class="text-subtitle2"
    v-bind="$attrs"
    @click="toggleEditor"
  >
    <slot>
      <span class="text-primary-subtle text-body2"
        ><slot name="label" />&nbsp;</span
      >
      <b><slot name="hightlight" /> </b>
    </slot>
  </q-chip>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const localStore = inject(StoreKey) as StoreModule
    const toggleEditor = () => localStore.mutations.toggleProfileEditor()
    return {
      toggleEditor,
    }
  },
})
</script>
