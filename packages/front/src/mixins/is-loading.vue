<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
