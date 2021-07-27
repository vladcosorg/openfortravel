<template>
  <q-select
    :label="label"
    :value="node.type"
    class="text-capitalize"
    :bg-color="color"
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
        <q-item-section
          :class="{ 'text-bold': ['or', 'and'].includes(scope.opt.value) }"
        >
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
import { computed, defineComponent, inject, PropType } from 'vue'
import capitalize from 'lodash/capitalize'

import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { TreeBuilderNode } from '@/admin/src/pages/edit/types'
import {
  LogicNodeType,
  Prerequisites,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export function getRestrictionLabel(value: RestrictionNodeType): string {
  let label = capitalize(value.replaceAll('-', ' '))
  switch (value) {
    case RestrictionNodeType.DID_NOT_VISIT_COUNTRIES:
      label = 'Recently visited'
      break

    case RestrictionNodeType.PCR_TEST:
      label = 'COVID-19 Test'
      break

    case RestrictionNodeType.RECOVERY:
      label = 'Recovered from COVID-19'
      break

    case RestrictionNodeType.VACCINATED:
      label = 'Vaccination'
      break

    case RestrictionNodeType.ORIGIN:
      label = 'Country of Origin'
      break
  }

  return label
}

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<TreeBuilderNode>,
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
        label: getRestrictionLabel(value),
      })),
    ]

    const logicTypes = Object.values(LogicNodeType)
    const getTypeLabel = (type) =>
      logicTypes.includes(type)
        ? 'Group'
        : Prerequisites.includes(type)
        ? 'Condition'
        : 'Requirement'

    const label = computed(() => getTypeLabel(props.node.type))
    const color = computed(() => {
      if (props.node.UID === 1) {
        return ''
      }

      switch (props.node.type) {
        case LogicNodeType.OR:
          return 'indigo'

        case LogicNodeType.AND:
          return 'indigo-10'

        default:
          return Prerequisites.includes(props.node.type) ? 'teal-6' : 'teal-10'
      }
    })

    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const doAction = (newType: LogicNodeType | RestrictionNodeType) =>
      treeManager.updateNodeType(newType, props.node)
    return {
      color,
      doAction,
      options,
      label,
      getTypeLabel,
    }
  },
})
</script>
