<script lang="ts">
import { createElement as h, defineComponent, PropType } from 'vue'

import {
  Placement,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'

export default defineComponent({
  components: {},
  props: {
    restriction: {
      type: Object as PropType<RestrictionNode>,
      required: true,
    },
  },
  setup(props, { slots }) {
    if (props.restriction.options.customInstructionSubtitle) {
      const customTitle = props.restriction.options.customInstructionSubtitle
      const contentElement = h('span', { domProps: { innerHTML: customTitle } })

      switch (props.restriction.options.customContentPlacement) {
        case Placement.REPLACE:
          return () => contentElement

        case Placement.APPEND:
          return () => h('span', [...slots.default(), h('br'), contentElement])

        case Placement.PREPEND:
          return () =>
            h('span', [contentElement, h('br'), h('br'), ...slots.default()])
      }
    }

    return () => h('span', slots.default())
  },
})
</script>
