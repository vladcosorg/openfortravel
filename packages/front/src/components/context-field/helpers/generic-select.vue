<template>
  <q-select
    standout=""
    emit-value
    map-options
    :clear-icon="clearIcon"
    :dropdown-icon="icon"
    v-bind="$attrs"
    style="min-width: 250px; max-width: 500px"
    v-on="$listeners"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </q-select>
</template>

<script lang="ts">
import { ionHelpCircleOutline as infoIcon } from '@quasar/extras/ionicons-v5'
import { matCancel as clearIcon } from '@quasar/extras/material-icons'
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    return { icon, clearIcon, infoIcon }
  },
})
</script>
