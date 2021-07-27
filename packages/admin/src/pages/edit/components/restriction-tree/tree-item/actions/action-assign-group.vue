<template>
  <q-select
    v-if="show"
    v-model="value"
    label="Group"
    :bg-color="color"
    class="text-capitalize"
    style="width: 130px"
    standout
    dense
    map-options
    emit-value
    :disable="node.UID === 1"
    :options="options"
    clearable
  />
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'

import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { TreeBuilderRestrictionNode } from '@/admin/src/pages/edit/types'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const colorMap: Record<string, string> = {
  A: 'purple-10',
  B: 'cyan-8',
  C: 'accent',
  D: 'positive',
  E: 'negative',
  F: 'orange-10',
  G: 'light-green-9',
}

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<TreeBuilderRestrictionNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const options = Array.from({ length: 26 }, (_x, i) =>
      String.fromCharCode(65 + i),
    )
    const show = computed(
      () =>
        props.node.UID > 1 &&
        Object.values(RestrictionNodeType).includes(props.node.type),
    )
    const value = computed({
      get() {
        return props.node.group ?? undefined
      },
      set(value: string | null) {
        treeManager.updateNodeGroup(props.node, value ?? undefined)
      },
    })

    const color = computed(() => (value.value ? colorMap[value.value] : ''))

    return {
      show,
      options,
      value,
      color,
    }
  },
})
</script>
