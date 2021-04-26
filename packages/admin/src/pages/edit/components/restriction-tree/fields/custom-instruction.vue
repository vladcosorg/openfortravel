<template>
  <div
    v-if="scope.node.type !== 'or' && scope.node.type !== 'and' && scope.node.showCustom"
    class="row col-12 q-gutter-sm"
  >
    <q-input v-model="customInstructionTitle" class="col-12" dense outlined label="Title" />
    <q-input
      v-model="customInstructionSubtitle"
      class="col-12"
      dense
      outlined
      type="textarea"
      label="Subtitle"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { ExtractRestrictionOptions } from '@/admin/src/pages/edit/composables/use-tree'
import { Insurance } from '@/shared/src/restriction-tree/restriction-node/insurance'

type Options = ExtractRestrictionOptions<typeof Insurance>
export default defineComponent({
  model: {
    prop: 'scope',
  },
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const customInstructionTitle = computed({
      get() {
        return props.scope?.node.options?.customInstructionTitle ?? ''
      },
      set(value) {
        if (!value) {
          const options = Object.assign({}, props.scope.node.options ?? {})
          delete options['customInstructionTitle']
          Object.assign(props.scope.node, { options })
        } else {
          const options = Object.assign({}, props.scope.node.options ?? {}, {
            customInstructionTitle: value,
          })
          Object.assign(props.scope.node, { options })
        }
      },
    })

    const customInstructionSubtitle = computed({
      get() {
        return props.scope?.node.options?.customInstructionSubtitle ?? ''
      },
      set(value) {
        if (!value) {
          const options = Object.assign({}, props.scope.node.options ?? {})
          delete options['customInstructionSubtitle']
          Object.assign(props.scope.node, { options })
        } else {
          const options = Object.assign({}, props.scope.node.options ?? {}, {
            customInstructionSubtitle: value,
          })
          Object.assign(props.scope.node, { options })
        }
      },
    })

    return {
      customInstructionTitle,
      customInstructionSubtitle,
    }
  },
})
</script>
