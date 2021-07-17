<template>
  <simple-list
    label="Press ENTER to save a new value"
    placeholder="Click here to add a sub-destination"
    empty-value="None"
    v-bind="$attrs"
    hide-dropdown-icon
    new-value-mode="add-unique"
    use-chips
    input-debounce="0"
    use-input
    clearable
    multiple
    :dense="false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SimpleList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/base/simple-list.vue'

export default defineComponent({
  components: { SimpleList },
  inheritAttrs: false,
  setup() {
    return {}
  },
})
</script>
