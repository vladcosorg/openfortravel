<template>
  <div
    v-if="showTitleIfValid || showContentIfValid"
    class="row q-col-gutter-y-xs q-mt-xs"
  >
    <q-input
      v-if="showTitleIfValid"
      v-model="title"
      class="col"
      dense
      outlined
      label="Title"
    />
    <q-option-group
      v-if="showTitleIfValid"
      v-model="titlePlacement"
      :options="placementOptions"
      color="primary"
      inline
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
    <q-option-group
      v-if="showContentIfValid"
      v-model="contentPlacement"
      :options="placementOptions"
      color="primary"
      inline
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
import upperFirst from 'lodash/upperFirst'
import Vue from 'vue'

import { EventBus } from '@/admin/src/pages/edit/modules/symbols'
import { TreeBuilderRestrictionNode } from '@/admin/src/pages/edit/types'
import { Placement } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  model: {
    prop: 'scope',
  },
  props: {
    node: {
      type: Object as PropType<TreeBuilderRestrictionNode>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const eventBus = inject(EventBus) as Vue
    const title = computed({
      get() {
        return props.node.options.customInstructionTitle ?? ''
      },
      set(value) {
        emit('input', { customInstructionTitle: value })
      },
    })

    const titlePlacement = computed({
      get() {
        return props.node.options.customTitlePlacement ?? ''
      },
      set(value) {
        emit('input', { customTitlePlacement: value })
      },
    })

    const placementOptions: Array<{ label: string; value: Placement }> =
      Object.values(Placement).map((placement) => ({
        label: upperFirst(placement),
        value: placement,
      }))

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
        emit('input', { customInstructionSubtitle: value })
      },
    })

    const contentPlacement = computed({
      get() {
        return props.node.options.customContentPlacement ?? ''
      },
      set(value) {
        emit('input', { customContentPlacement: value })
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
      contentPlacement,
      placementOptions,
      titlePlacement,
    }
  },
})
</script>
