<template>
  <generic v-model="internalOptions" :type="node.type" />
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent } from '@vue/composition-api'

import Generic from '@/admin/src/pages/edit/components/restriction-tree/tree-item/generic.vue'
import type { QuasarRestrictionTreeNode } from '@/admin/src/pages/edit/composables/use-tree'

export default defineComponent({
  components: {
    Generic,
  },
  model: {
    prop: 'node',
  },
  props: {
    node: {
      type: Object as PropType<QuasarRestrictionTreeNode>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const internalOptions = computed({
      get() {
        return props.node.options ?? {}
      },
      set(value) {
        emit('input', Object.assign({}, props.node, { options: value }))
      },
    })
    return { internalOptions }
  },
})
</script>
