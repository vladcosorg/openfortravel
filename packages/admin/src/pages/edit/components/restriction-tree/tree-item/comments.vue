<template>
  <q-input v-model="setter" dense borderless />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'
import omit from 'lodash/omit'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import {
  TreeManager,
  TreeManagerStoreKey,
} from '@/admin/src/pages/edit/modules/tree-manager'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const setter = computed({
      get() {
        return props.node?.comment ?? ''
      },
      set(value: string) {
        const options = props.node
        treeManager.updateNodeProperty(
          value.length === 0
            ? omit(props.node, ['comment'])
            : Object.assign({}, props.node, {
                comment: value,
              }),
        )
      },
    })
    return { setter }
  },
})
</script>
