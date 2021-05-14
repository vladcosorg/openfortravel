<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<VisitorContextType>,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },
})
</script>
