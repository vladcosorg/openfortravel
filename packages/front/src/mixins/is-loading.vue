<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
