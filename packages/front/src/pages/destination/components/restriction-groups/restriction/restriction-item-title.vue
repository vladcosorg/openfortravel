<script lang="ts">
import { h, defineComponent, PropType, computed } from 'vue'

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
    if (props.restriction.options.customInstructionTitle) {
      const customTitle = computed(
        () => props.restriction.options.customInstructionTitle,
      )

      switch (props.restriction.options.customTitlePlacement) {
        case Placement.REPLACE:
          return () => h('span', { innerHTML: customTitle.value })

        case Placement.APPEND:
          return () =>
            h('span', [
              ...(slots.default ? slots.default() : []),
              ' ',
              h('span', { innerHTML: customTitle.value }),
            ])

        case Placement.PREPEND:
          return () =>
            h('span', [
              h('span', { innerHTML: customTitle.value }),
              ...(slots.default ? slots.default() : []),
            ])
      }
    }

    return () => h('span', slots.default ? slots.default() : [])
  },
})
</script>
