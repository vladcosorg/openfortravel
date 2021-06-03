<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    // eslint-disable-next-line vue/no-unused-properties
    step: {
      type: Number,
      required: true,
    },
  },
})
</script>
