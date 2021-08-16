<script lang="ts">
import { h, defineComponent, PropType } from 'vue'

import {
  Placement,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'

export default defineComponent({
  components: {},
  props: {
    restriction: {
      type: Object as PropType<AbstractRestrictionNode>,
      required: true,
    },
  },
  setup(props, { slots }) {
    if (props.restriction.options.customInstructionSubtitle) {
      const contentElement = h('span', {
        innerHTML: props.restriction.options.customInstructionSubtitle,
      })

      switch (props.restriction.options.customContentPlacement) {
        case Placement.REPLACE:
          return () => contentElement

        case Placement.APPEND:
          return () =>
            h('span', [
              ...(slots.default ? slots.default() : []),
              h('br'),
              contentElement,
            ])

        case Placement.PREPEND:
          return () =>
            h('span', [
              contentElement,
              h('br'),
              h('br'),
              ...(slots.default ? slots.default() : []),
            ])
      }
    }

    return () => h('span', slots.default ? slots.default() : [])
  },
})
</script>
