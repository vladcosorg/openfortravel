<template>
  <q-btn v-if="show" label="Add content" unelevated @click="doAction" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'
import Vue from 'vue'

import { EventBus } from '@/admin/src/pages/edit/components/restriction-tree.vue'
import { QuasarRestrictionTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarRestrictionTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const eventBus = inject(EventBus) as Vue
    const show = computed(
      () =>
        props.node.type !== RestrictionNodeType.CUSTOM_REQUIREMENT &&
        Object.values(RestrictionNodeType).includes(props.node.type) &&
        !props.node.options.customInstructionSubtitle?.length,
    )

    const doAction = () => {
      eventBus.$emit(`show-content-${props.node.UID}`)
    }

    return {
      show,
      doAction,
    }
  },
})
</script>
