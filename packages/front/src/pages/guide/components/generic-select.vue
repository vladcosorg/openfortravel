<template>
  <q-select
    standout=""
    emit-value
    class="col-12 col-sm-6"
    map-options
    :dropdown-icon="icon"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </q-select>
</template>

<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return { icon }
  },
})
</script>
