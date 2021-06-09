<template>
  <div
    v-if="showTitleIfValid || showContentIfValid"
    class="row col-6 q-col-gutter-y-xs q-mt-xs"
  >
    <q-input
      v-if="showTitleIfValid"
      v-model="title"
      class="col-12"
      dense
      outlined
      label="Title"
    />
    <q-input
      v-if="showContentIfValid"
      v-model="content"
      class="col-12"
      dense
      outlined
      type="textarea"
      label="Content"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
} from '@vue/composition-api'
import Vue from 'vue'

import type { QuasarRestrictionTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import {
  EventBus,
  TreeManagerStoreKey,
} from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  model: {
    prop: 'scope',
  },
  props: {
    node: {
      type: Object as PropType<QuasarRestrictionTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const eventBus = inject(EventBus) as Vue
    const title = computed({
      get() {
        return props.node.options.customInstructionTitle ?? ''
      },
      set(value) {
        treeManager.updateNodeOption(
          props.node,
          'customInstructionTitle',
          value,
        )
      },
    })

    const forceShowTitle = ref(false)
    eventBus.$on(`show-title-${props.node.UID}`, () => {
      forceShowTitle.value = true
    })

    const showTitle =
      Object.values(RestrictionNodeType).includes(props.node.type) &&
      title.value.length > 0

    const showTitleIfValid = computed(
      () =>
        props.node.type === RestrictionNodeType.CUSTOM_REQUIREMENT ||
        showTitle ||
        forceShowTitle.value,
    )

    const content = computed({
      get() {
        return props.node.options.customInstructionSubtitle ?? ''
      },
      set(value) {
        treeManager.updateNodeOption(
          props.node,
          'customInstructionSubtitle',
          value,
        )
      },
    })

    const forceShowContent = ref(false)
    eventBus.$on(`show-content-${props.node.UID}`, () => {
      forceShowContent.value = true
    })

    const showContent =
      Object.values(RestrictionNodeType).includes(props.node.type) &&
      content.value.length > 0

    const showContentIfValid = computed(
      () =>
        props.node.type === RestrictionNodeType.CUSTOM_REQUIREMENT ||
        showContent ||
        forceShowContent.value,
    )

    return {
      title,
      showTitleIfValid,
      content,
      showContentIfValid,
    }
  },
})
</script>
