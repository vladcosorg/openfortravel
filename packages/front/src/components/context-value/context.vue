<template>
  <span
    :class="`relative-position bg-elevation-1 q-pa-xs rounded-borders ${$style.context}`"
    ><slot /><q-icon :name="downIcon" />
  </span>
</template>

<style lang="sass" module>
.context
  cursor: pointer
  &:hover
    background-color: 1px solid var(--q-elevation-2)
</style>

<script lang="ts">
import { matKeyboardArrowDown as downIcon } from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'

import CitizenshipContext from '@/front/src/components/context-field/citizenship/citizenship-context.vue'

export default defineComponent({
  components: { CitizenshipContext },
  setup() {
    return {
      downIcon,
    }
  },
})
</script>
