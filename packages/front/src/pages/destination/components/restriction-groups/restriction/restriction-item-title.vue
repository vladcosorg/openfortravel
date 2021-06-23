<script lang="ts">
import {
  createElement as h,
  defineComponent,
  PropType,
} from '@vue/composition-api'

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
      const customTitle = props.restriction.options.customInstructionTitle

      switch (props.restriction.options.customTitlePlacement) {
        case Placement.REPLACE:
          return () => h('span', { domProps: { innerHTML: customTitle } })

        case Placement.APPEND:
          return () =>
            h('span', [
              ...slots.default(),
              ' ',
              h('span', { domProps: { innerHTML: customTitle } }),
            ])

        case Placement.PREPEND:
          return () =>
            h('span', [
              h('span', { domProps: { innerHTML: customTitle } }),
              ...slots.default(),
            ])
      }
    }

    return () => h('span', slots.default())
  },
})
</script>
