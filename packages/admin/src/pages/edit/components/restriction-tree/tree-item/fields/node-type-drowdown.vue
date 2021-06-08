<template>
  <q-select
    :label="label"
    :value="node.type"
    class="text-capitalize"
    bg-color="teal-6"
    style="width: 200px"
    standout
    dense
    map-options
    emit-value
    :disable="node.UID === 1"
    :options="options"
    @input="doAction"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-html="scope.opt.label" />
          <q-item-label caption>{{
            getTypeLabel(scope.opt.value)
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style lang="scss">
.q-tree__node-header.q-hoverable .q-focus-helper {
  background-color: transparent;
  display: none;
}
</style>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'
import capitalize from 'lodash/capitalize'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import {
  TreeManager,
  TreeManagerStoreKey,
} from '@/admin/src/pages/edit/modules/tree-manager'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const options = [
      ...Object.values(LogicNodeType).map((value: string) => ({
        value,
        label: capitalize(value.replaceAll('-', ' ')),
      })),

      ...Object.values(RestrictionNodeType).map((value) => ({
        value,
        label: capitalize(value.replaceAll('-', ' ')),
      })),
    ]

    const logicTypes = Object.values(LogicNodeType)
    const getTypeLabel = (type) =>
      logicTypes.includes(type) ? 'Condition' : 'Restriction'

    const label = computed(() => getTypeLabel(props.node.type))

    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const doAction = (newType: LogicNodeType | RestrictionNodeType) =>
      treeManager.updateNodeType(newType, props.node)
    return {
      doAction,
      options,
      label,
      getTypeLabel,
    }
  },
})
</script>
