<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
})
</script>
